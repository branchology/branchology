import { generateUuid, returnFirst } from '../lib';
import {
  EVENT_TABLE,
  PEOPLE_TABLE,
  PERSON_EVENT_TABLE,
  PERSON_NAME_TABLE,
  PERSON_NAME_SOURCE_CITATION_TABLE,
  PERSON_NOTE_TABLE,
  PERSON_NAME_NOTE_TABLE,
  PERSON_RELATIONSHIPS_TABLE,
  PERSON_SOURCE_CITATION_TABLE,
  RELATIONSHIP_TABLE,
  SOURCE_CITATION_TABLE,
} from './constants';
import Event from './Event';
import formatForDb from './lib/formatForDb';
import { NOTE_TABLE } from './note';
import { createSourceCitation } from './source';

function createIdLoader(db, tableName, idColumn = 'id') {
  return id =>
    db
      .select('*')
      .from(tableName)
      .where(idColumn, id)
      .then(returnFirst);
}

export default class Person {
  constructor(db) {
    this.db = db;

    // TODO: FIXME: 
    this.event = new Event(db);
  }

  createIdLoader(tableName, idColumn = 'id') {
    return id =>
      this.db
        .select('*')
        .from(tableName)
        .where(idColumn, id)
        .then(returnFirst);
  }

  findById(id) {
    return this.db
      .select('*')
      .from('people')
      .where('id', id)
      .then(returnFirst);
  }

  findAll(filter, sorting) {
    // TODO: Sorting + filtering
    return this.db.select(['*']).from(PEOPLE_TABLE);
  }

  findByIds(ids) {
    return this.db(PEOPLE_TABLE)
      .select('*')
      .whereIn('id', ids);
  }

  findCitationsByPersonIds(ids) {
    return this.db
      .select(['sc.*', 'person_id'])
      .from(`${PERSON_SOURCE_CITATION_TABLE} AS psc`)
      .join(`${SOURCE_CITATION_TABLE} AS sc`, 'sc.id', 'psc.source_citation_id')
      .whereIn('person_id', ids);
  }

  findEventsByPersonIds(ids) {
    return this.db
      .select(['e.*', 'pe.id AS person_event_id', 'pe.person_id'])
      .from(`${PERSON_EVENT_TABLE} as pe`)
      .join(`${EVENT_TABLE} as e`, 'e.id', 'pe.event_id')
      .whereIn('person_id', ids);
  }

  findNameCitationsByPersonIds(ids) {
    return this.db
      .select(['sc.*', 'person_name_id'])
      .from(`${PERSON_NAME_SOURCE_CITATION_TABLE} AS nsc`)
      .join(`${SOURCE_CITATION_TABLE} AS sc`, 'sc.id', 'nsc.source_citation_id')
      .whereIn('person_name_id', ids);
  }

  findNameByIds(ids) {
    return this.db(PERSON_NAME_TABLE)
      .select('*')
      .whereIn('id', ids);
  }

  findNamesByPersonIds(ids) {
    return this.db
      .select(['*'])
      .from(PERSON_NAME_TABLE)
      .whereIn('person_id', ids);
  }

  findNameNotesByPersonNameIds(ids) {
    return this.db
      .select(['n.*', 'pnn.person_name_id'])
      .from(`${PERSON_NAME_NOTE_TABLE} AS pnn`)
      .join(`${NOTE_TABLE} as n`, 'n.id', 'pnn.note_id')
      .whereIn('person_name_id', ids);
  }

  findNotesByPersonIds(ids) {
    return this.db
      .select(['n.*', 'pn.person_id'])
      .from(`${PERSON_NOTE_TABLE} AS pn`)
      .join(`${NOTE_TABLE} as n`, 'n.id', 'pn.note_id')
      .whereIn('person_id', ids);
  }

  findPrimaryEventsByPersonIdAndType(pairs) {
    return this.db
      .select(['e.*', 'pe.id AS person_event_id', 'pe.person_id'])
      .from(`${PERSON_EVENT_TABLE} as pe`)
      .join(`${EVENT_TABLE} as e`, 'e.id', 'pe.event_id')
      .whereIn(this.db.raw('(person_id, LOWER(e.type))'), pairs);
  }

  findPreferredNameByIds(ids) {
    return this.db
      .select(['*'])
      .from(PERSON_NAME_TABLE)
      .where('is_preferred', true)
      .whereIn('person_id', ids);
  }

  findRelationshipsByPersonIds(ids) {
    return this.db
      .select(['pr.person_id', 'r.*'])
      .from(`${PERSON_RELATIONSHIPS_TABLE} AS pr`)
      .join(`${RELATIONSHIP_TABLE} as r`, 'r.id', 'pr.relationship_id')
      .whereIn('person_id', ids);
  }

  async createName(personId, nameData) {
    const nameId = generateUuid();

    // TODO: FIXME: Implement
    const { sources = [], notes = [], ...data } = nameData;

    const name = await this.db(PERSON_NAME_TABLE)
      .insert(
        {
          id: nameId,
          person_id: personId,
          ...data,
        },
        '*',
      )
      .then(returnFirst);

    return Promise.all(
      sources.map(({ sourceId, ...data }) => {
        return addPersonNameSourceCitation(name.id, sourceId, data);
      }),
    ).then(() => name);
  }

  async create(data) {
    const {
      id,
      sex,
      given,
      surname,
      birthDate,
      birthPlace,
      birthPlaceId,
      deathDate,
      deathPlace,
      deathPlaceId,
    } = data;

    const personId = id || generateUuid();

    // create a person...
    const person = await this.db(PEOPLE_TABLE)
      .insert({ id: personId, sex }, '*')
      .then(returnFirst);

    const bagOfPromises = [];

    if (given || surname) {
      bagOfPromises.push(createPersonName(personId, { given, surname }));
    }

    if (birthDate || birthPlace || birthPlaceId) {
      const birth = await this.event.createEvent('birt', {
        date: birthDate,
        place: birthPlace,
        placeId: birthPlaceId,
      });
      await attachPersonEvent(personId, birth.id);
    }

    if (deathDate || deathPlace || deathPlaceId) {
      const death = await this.event.createEvent('deat', {
        date: deathDate,
        place: deathPlace,
        placeId: deathPlaceId,
      });
      await attachPersonEvent(personId, death.id);
    }

    return Promise.all(bagOfPromises).then(() => person);
  }

  async addSourceCitation(personId, sourceId, data) {
    const id = generateUuid();

    const citation = await createSourceCitation(sourceId, data);

    return this.db(PERSON_SOURCE_CITATION_TABLE)
      .insert(
        {
          id,
          person_id: personId,
          source_citation_id: citation.id,
        },
        '*',
      )
      .then(returnFirst);
  }

  addName(personId, { given, surname, isPreferred = false }) {
    // TODO: FIXME: other name parts
    return this.db(PERSON_NAME_TABLE)
      .insert(
        formatForDb({
          id: generateUuid(),
          person_id: personId,
          given,
          surname,
          isPreferred,
        }),
        '*',
      )
      .then(returnFirst);
  }

  updateName(personNameId, nameData) {
    return this.db(PERSON_NAME_TABLE)
      .update(nameData, '*')
      .where('id', personNameId)
      .then(returnFirst);
  }

  removeName(personNameId) {
    return this.db(PERSON_NAME_TABLE)
      .delete()
      .where('id', personNameId);
  }

  async setPersonNamePreferred(personNameId) {
    const personNames = await this.findNameByIds([personNameId]);
    if (!personNames.length) {
      throw `Cannot find personName`;
    }

    const allPersonNames = await this.findNamesByPersonIds([
      personNames[0].person_id,
    ]);

    await Promise.all(
      allPersonNames.map(pn => this.updateName(pn.id, { is_preferred: false })),
    );

    return this.updateName(personNames[0].id, { is_preferred: true });
  }

  async addNameSourceCitation(personNameId, sourceId, data) {
    const id = generateUuid();

    const citation = await createSourceCitation(sourceId, data);

    return this.db(PERSON_NAME_SOURCE_CITATION_TABLE)
      .insert(
        {
          id,
          person_name_id: personNameId,
          source_citation_id: citation.id,
        },
        '*',
      )
      .then(returnFirst);
  }

  attachEvent(personId, eventId) {
    const id = generateUuid();

    return this.db(PERSON_EVENT_TABLE)
      .insert({ id, person_id: personId, event_id: eventId }, '*')
      .then(returnFirst);
  }

  attachNote(personId, noteId) {
    const id = generateUuid();

    return this.db(PERSON_NOTE_TABLE)
      .insert({ id, person_id: personId, note_id: noteId }, '*')
      .then(returnFirst);
  }

  attachNameNote(personNameId, noteId) {
    const id = generateUuid();

    return this.db(PERSON_NAME_NOTE_TABLE)
      .insert({ id, person_name_id: personNameId, note_id: noteId }, '*')
      .then(returnFirst);
  }

  attachRelationship(personId, relationshipId) {
    const id = generateUuid();

    return this.db(PERSON_RELATIONSHIPS_TABLE)
      .insert({ id, person_id: personId, relationship_id: relationshipId }, '*')
      .then(returnFirst);
  }
}
