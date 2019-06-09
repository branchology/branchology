import { returnFirst } from 'lib';
import {
  EVENT_TABLE,
  PEOPLE_TABLE,
  PERSON_ATTRIBUTE_TABLE,
  PERSON_EVENT_TABLE,
  PERSON_NAME_TABLE,
  PERSON_NAME_SOURCE_CITATION_TABLE,
  PERSON_NOTE_TABLE,
  PERSON_NAME_NOTE_TABLE,
  PERSON_RELATIONSHIPS_TABLE,
  PERSON_SOURCE_CITATION_TABLE,
  RELATIONSHIP_TABLE,
  SOURCE_CITATION_TABLE,
  PERSON_ATTRIBUTE_SOURCE_CITATION_TABLE,
  PERSON_ATTRIBUTE_NOTE_TABLE,
} from './constants';
import Event from './Event';
import {
  applyPaging,
  applySorting,
  dbToGraphQL,
  generateUuid,
  graphQLToDb,
} from './lib';
import { NOTE_TABLE } from './note';
import Place from './Place';
import Source from './Source';

export default class Person {
  constructor(db) {
    this.db = db;

    // TODO: FIXME:
    this.event = new Event(db);
    this.place = new Place(db);
    this.source = new Source(db);
  }

  createIdLoader(tableName, idColumn = 'id') {
    return id =>
      this.db
        .select('*')
        .from(tableName)
        .where(idColumn, id)
        .then(returnFirst);
  }

  findAttributeById(id) {
    return this.db
      .select('*')
      .from(PERSON_ATTRIBUTE_TABLE)
      .where('id', id)
      .then(returnFirst);
  }

  findById(id) {
    return this.db
      .select('*')
      .from('people')
      .where('id', id)
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  findNameById(id) {
    return this.db
      .select('*')
      .from(PERSON_NAME_TABLE)
      .where('id', id)
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  findAll(filters, sorting, paging) {
    const query = this.db
      .select('p.*')
      .from('people as p')
      .join('person_names AS pn', builder => {
        builder
          .on('pn.person_id', '=', 'p.id')
          .andOn('pn.is_preferred', '=', this.db.raw(true));
      });

    if (filters.nameContains) {
      const { nameContains } = filters;
      query.where(function() {
        this.whereRaw('surname ~* ?', [nameContains]).orWhereRaw('given ~* ?', [
          nameContains,
        ]);
      });

      delete filters.nameContains;
    }

    return applyPaging(applySorting(query, sorting), paging).then(
      ({ paging, items }) => ({ paging, items: dbToGraphQL(items) }),
    );
  }

  findByIds(ids) {
    return this.db(PEOPLE_TABLE)
      .select('*')
      .whereIn('id', ids)
      .then(dbToGraphQL);
  }

  findCitationsByPersonIds(ids) {
    return this.db
      .select(['sc.*', 'person_id'])
      .from(`${PERSON_SOURCE_CITATION_TABLE} AS psc`)
      .join(`${SOURCE_CITATION_TABLE} AS sc`, 'sc.id', 'psc.source_citation_id')
      .whereIn('person_id', ids)
      .then(dbToGraphQL);
  }

  findCitationsByAttributeIds(ids) {
    return this.db
      .select(['sc.*', 'pas.person_attribute_id'])
      .from(`${PERSON_ATTRIBUTE_SOURCE_CITATION_TABLE} AS pas`)
      .join(`${SOURCE_CITATION_TABLE} AS sc`, 'sc.id', 'pas.source_citation_id')
      .whereIn('pas.person_attribute_id', ids)
      .then(dbToGraphQL);
  }

  findEventsByPersonIds(ids) {
    return this.db
      .select(['e.*', 'pe.id AS person_event_id', 'pe.person_id'])
      .from(`${PERSON_EVENT_TABLE} as pe`)
      .join(`${EVENT_TABLE} as e`, 'e.id', 'pe.event_id')
      .whereIn('person_id', ids)
      .then(dbToGraphQL);
  }

  findNameCitationsByPersonIds(ids) {
    return this.db
      .select(['sc.*', 'person_name_id'])
      .from(`${PERSON_NAME_SOURCE_CITATION_TABLE} AS nsc`)
      .join(`${SOURCE_CITATION_TABLE} AS sc`, 'sc.id', 'nsc.source_citation_id')
      .whereIn('person_name_id', ids)
      .then(dbToGraphQL);
  }

  findNameByIds(ids) {
    return this.db(PERSON_NAME_TABLE)
      .select('*')
      .whereIn('id', ids)
      .then(dbToGraphQL);
  }

  findNamesByPersonIds(ids) {
    return this.db
      .select(['*'])
      .from(PERSON_NAME_TABLE)
      .whereIn('person_id', ids)
      .then(dbToGraphQL);
  }

  findNameNotesByPersonNameIds(ids) {
    return this.db
      .select(['n.*', 'pnn.person_name_id'])
      .from(`${PERSON_NAME_NOTE_TABLE} AS pnn`)
      .join(`${NOTE_TABLE} as n`, 'n.id', 'pnn.note_id')
      .whereIn('person_name_id', ids)
      .then(dbToGraphQL);
  }

  findNotesByAttributeIds(ids) {
    return this.db
      .select(['n.*', 'pan.person_attribute_id'])
      .from(`${PERSON_ATTRIBUTE_NOTE_TABLE} AS pan`)
      .join(`${NOTE_TABLE} as n`, 'n.id', 'pan.note_id')
      .whereIn('pan.id', ids)
      .then(dbToGraphQL);
  }

  findNotesByPersonIds(ids) {
    return this.db
      .select(['n.*', 'pn.person_id'])
      .from(`${PERSON_NOTE_TABLE} AS pn`)
      .join(`${NOTE_TABLE} as n`, 'n.id', 'pn.note_id')
      .whereIn('person_id', ids)
      .then(dbToGraphQL);
  }

  findPrimaryEventsByPersonIdAndType(pairs) {
    return this.db
      .select(['e.*', 'pe.id AS person_event_id', 'pe.person_id'])
      .from(`${PERSON_EVENT_TABLE} as pe`)
      .join(`${EVENT_TABLE} as e`, 'e.id', 'pe.event_id')
      .whereIn(
        this.db.raw('(person_id, LOWER(e.type))'),
        pairs.map(([personId, type]) => [personId, type.toLowerCase()]),
      )
      .then(dbToGraphQL);
  }

  findPreferredNameByIds(ids) {
    return this.db
      .select(['*'])
      .from(PERSON_NAME_TABLE)
      .where('is_preferred', true)
      .whereIn('person_id', ids)
      .then(dbToGraphQL);
  }

  findRelationshipsByPersonIds(ids) {
    return this.db
      .select(['pr.person_id', 'r.*'])
      .from(`${PERSON_RELATIONSHIPS_TABLE} AS pr`)
      .join(`${RELATIONSHIP_TABLE} as r`, 'r.id', 'pr.relationship_id')
      .whereIn('person_id', ids)
      .then(dbToGraphQL);
  }

  async createAttribute(personId, attrData) {
    const { data, date, place, placeId, type, isPreferred = true } = attrData;

    let dbPlaceId;
    if (place || placeId) {
      dbPlaceId = placeId;
      if (place) {
        const newPlace = await this.place.create({ description: place });
        dbPlaceId = newPlace.id;
      }
    }

    return this.db(PERSON_ATTRIBUTE_TABLE)
      .insert(
        formatDbValues({
          id: generateUuid(),
          personId: personId,
          type,
          data,
          date,
          placeId: dbPlaceId,
          isPreferred,
        }),
        '*',
      )
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  removeAttribute(attributeId) {
    return this.db(PERSON_ATTRIBUTE_TABLE)
      .delete()
      .returning('*')
      .where('id', attributeId)
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  addAttributeSourceCitation = async (attributeId, sourceId, data) => {
    const id = generateUuid();

    const citation = await this.source.createSourceCitation(sourceId, data);

    return this.db(PERSON_ATTRIBUTE_SOURCE_CITATION_TABLE)
      .insert(
        graphQLToDb({
          id,
          personAttributeId: attributeId,
          sourceCitationId: citation.id,
        }),
        '*',
      )
      .then(returnFirst)
      .then(dbToGraphQL);
  };

  async createName(personId, nameData) {
    const nameId = generateUuid();

    return this.db(PERSON_NAME_TABLE)
      .insert(
        graphQLToDb({
          id: nameId,
          personId,
          ...nameData,
        }),
        '*',
      )
      .then(returnFirst)
      .then(dbToGraphQL);
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
      .then(returnFirst)
      .then(dbToGraphQL);

    const bagOfPromises = [];

    if (given || surname) {
      bagOfPromises.push(this.createName(personId, { given, surname }));
    }

    if (birthDate || birthPlace || birthPlaceId) {
      const birth = await this.event.createEvent('BIRT', {
        date: birthDate,
        place: birthPlace,
        placeId: birthPlaceId,
      });
      await this.attachEvent(personId, birth.id);
    }

    if (deathDate || deathPlace || deathPlaceId) {
      const death = await this.event.createEvent('DEAT', {
        date: deathDate,
        place: deathPlace,
        placeId: deathPlaceId,
      });
      await this.attachEvent(personId, death.id);
    }

    return Promise.all(bagOfPromises).then(() => person);
  }

  async addSourceCitation(personId, sourceId, data) {
    const id = generateUuid();

    // TODO: FIXME: fix what? nice comment...
    const citation = await createSourceCitation(sourceId, data);

    return this.db(PERSON_SOURCE_CITATION_TABLE)
      .insert(
        graphQLToDb({
          id,
          personId,
          sourceCitationId: citation.id,
        }),
        '*',
      )
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  addName(personId, { given, surname, isPreferred = false }) {
    // TODO: FIXME: other name parts
    return this.db(PERSON_NAME_TABLE)
      .insert(
        graphQLToDb({
          id: generateUuid(),
          personId,
          given,
          surname,
          isPreferred,
        }),
        '*',
      )
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  updateName(personNameId, nameData) {
    return this.db(PERSON_NAME_TABLE)
      .update(nameData, '*')
      .where('id', personNameId)
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  removeName(personNameId) {
    return this.db(PERSON_NAME_TABLE)
      .delete()
      .returning('*')
      .where('id', personNameId)
      .then(personName => personName[0])
      .then(dbToGraphQL);
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

  async setPersonEventPreferred(eventId) {
    const personEvent = await this.db(`${PERSON_EVENT_TABLE} AS pe`)
      .select(['e.*', 'pe.id AS person_event_id', 'pe.person_id'])
      .join(`${EVENT_TABLE} AS e`, 'e.id', 'pe.event_id')
      .where('e.id', eventId)
      .then(returnFirst);
    if (!personEvent) {
      throw `Cannot find personEvent`;
    }

    const allPersonEvents = await this.db(`${PERSON_EVENT_TABLE} AS pe`)
      .select(['e.*', 'pe.id AS person_event_id'])
      .join(`${EVENT_TABLE} AS e`, 'e.id', 'pe.event_id')
      .where({
        person_id: personEvent.person_id,
        type: personEvent.type,
        is_preferred: true,
      });

    await Promise.all(
      allPersonEvents.map(pe =>
        this.db(EVENT_TABLE)
          .update({ is_preferred: false })
          .where('id', pe.id),
      ),
    );

    return this.db(EVENT_TABLE)
      .update({ is_preferred: true })
      .where('id', personEvent.id)
      .then(() => personEvent);
  }

  addNameSourceCitation = async (personNameId, sourceId, data) => {
    const id = generateUuid();

    const citation = await this.source.createSourceCitation(sourceId, data);

    return this.db(PERSON_NAME_SOURCE_CITATION_TABLE)
      .insert(
        graphQLToDb({
          id,
          personNameId,
          sourceCitationId: citation.id,
        }),
        '*',
      )
      .then(returnFirst)
      .then(dbToGraphQL);
  };

  attachEvent(personId, eventId) {
    const id = generateUuid();

    return this.db(PERSON_EVENT_TABLE)
      .insert(graphQLToDb({ id, personId, eventId }), '*')
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  removeEvent(eventId) {
    return this.db(PERSON_EVENT_TABLE)
      .delete()
      .returning('*')
      .where('event_id', eventId)
      .then(personEvent => {
        return this.db(EVENT_TABLE)
          .delete()
          .where('id', eventId)
          .then(() => personEvent[0]);
      })
      .then(dbToGraphQL);
  }

  attachNote(personId, noteId) {
    const id = generateUuid();

    return this.db(PERSON_NOTE_TABLE)
      .insert(graphQLToDb({ id, personId, noteId }), '*')
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  attachNameNote(personNameId, noteId) {
    const id = generateUuid();

    return this.db(PERSON_NAME_NOTE_TABLE)
      .insert(graphQLToDb({ id, personNameId, noteId }), '*')
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  attachRelationship(personId, relationshipId) {
    const id = generateUuid();

    return this.db(PERSON_RELATIONSHIPS_TABLE)
      .insert(graphQLToDb({ id, personId, relationshipId }), '*')
      .then(returnFirst)
      .then(dbToGraphQL);
  }
}
