import db from './conn';
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
import { createEvent } from './event';
import { NOTE_TABLE } from './note';
import { createSourceCitation } from './source';

function createIdLoader(tableName, idColumn = 'id') {
  return id =>
    db
      .select('*')
      .from(tableName)
      .where(idColumn, id)
      .then(returnFirst);
}

export const findPersonById = createIdLoader(PEOPLE_TABLE);

export function findAllPeople(filter, sorting) {
  // TODO: Sorting + filtering
  return db.select(['*']).from(PEOPLE_TABLE);
}

export function findPeopleByIds(ids) {
  return db(PEOPLE_TABLE)
    .select('*')
    .whereIn('id', ids);
}

export function findPersonCitationsByPersonIds(ids) {
  return db
    .select(['sc.*', 'person_id'])
    .from(`${PERSON_SOURCE_CITATION_TABLE} AS psc`)
    .join(`${SOURCE_CITATION_TABLE} AS sc`, 'sc.id', 'psc.source_citation_id')
    .whereIn('person_id', ids);
}

export function findPersonEventsByPersonIds(ids) {
  return db
    .select(['e.*', 'pe.id AS person_event_id', 'pe.person_id'])
    .from(`${PERSON_EVENT_TABLE} as pe`)
    .join(`${EVENT_TABLE} as e`, 'e.id', 'pe.event_id')
    .whereIn('person_id', ids);
}

export function findPersonNameCitationsByPersonIds(ids) {
  return db
    .select(['sc.*', 'person_name_id'])
    .from(`${PERSON_NAME_SOURCE_CITATION_TABLE} AS nsc`)
    .join(`${SOURCE_CITATION_TABLE} AS sc`, 'sc.id', 'nsc.source_citation_id')
    .whereIn('person_name_id', ids);
}

export function findPersonNamesByPersonIds(ids) {
  return db
    .select(['*'])
    .from(PERSON_NAME_TABLE)
    .whereIn('person_id', ids);
}

export function findPersonNameNotesByPersonNameIds(ids) {
  return db
    .select(['n.*', 'pnn.person_name_id'])
    .from(`${PERSON_NAME_NOTE_TABLE} AS pnn`)
    .join(`${NOTE_TABLE} as n`, 'n.id', 'pnn.note_id')
    .whereIn('person_name_id', ids);
}

export function findPersonNotesByPersonIds(ids) {
  return db
    .select(['n.*', 'pn.person_id'])
    .from(`${PERSON_NOTE_TABLE} AS pn`)
    .join(`${NOTE_TABLE} as n`, 'n.id', 'pn.note_id')
    .whereIn('person_id', ids);
}

export function findPersonPrimaryEventsByPersonIdAndType(pairs) {
  return db
    .select(['e.*', 'pe.id AS person_event_id', 'pe.person_id'])
    .from(`${PERSON_EVENT_TABLE} as pe`)
    .join(`${EVENT_TABLE} as e`, 'e.id', 'pe.event_id')
    .whereIn(db.raw('(person_id, e.type)'), pairs);
}

export function findPersonPreferredNameByIds(ids) {
  return db
    .select(['*'])
    .from(PERSON_NAME_TABLE)
    .where('is_preferred', true)
    .whereIn('person_id', ids);
}

export function findPersonRelationshipsByPersonIds(ids) {
  return db
    .select(['pr.person_id', 'r.*'])
    .from(`${PERSON_RELATIONSHIPS_TABLE} AS pr`)
    .join(`${RELATIONSHIP_TABLE} as r`, 'r.id', 'pr.relationship_id')
    .whereIn('person_id', ids);
}

export async function createPersonName(personId, nameData) {
  const nameId = generateUuid();

  // TODO: FIXME: Implement
  const { sources, notes, ...data } = nameData;

  const name = await db(PERSON_NAME_TABLE)
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

export async function createPerson(data) {
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
  const person = await db(PEOPLE_TABLE)
    .insert({ id: personId, sex }, '*')
    .then(returnFirst);

  const bagOfPromises = [];

  if (given || surname) {
    bagOfPromises.push(createPersonName(personId, { given, surname }));
  }

  if (birthDate || birthPlace || birthPlaceId) {
    const birth = await createEvent('birt', {
      date: birthDate,
      place: birthPlace,
      placeId: birthPlaceId,
    });
    await attachPersonEvent(personId, birth.id);
  }

  if (deathDate || deathPlace || deathPlaceId) {
    const death = await createEvent('deat', {
      date: deathDate,
      place: deathPlace,
      placeId: deathPlaceId,
    });
    await attachPersonEvent(personId, death.id);
  }

  return Promise.all(bagOfPromises).then(() => person);
}

export async function addPersonSourceCitation(personId, sourceId, data) {
  const id = generateUuid();

  const citation = await createSourceCitation(sourceId, data);

  return db(PERSON_SOURCE_CITATION_TABLE)
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

export function addPersonName(personId, { given, surname }) {
  // TODO: FIXME: other name parts
  return db(PERSON_NAME_TABLE)
    .insert({ id: generateUuid(), person_id: personId, given, surname }, '*')
    .then(returnFirst);
}

export async function addPersonNameSourceCitation(
  personNameId,
  sourceId,
  data,
) {
  const id = generateUuid();

  const citation = await createSourceCitation(sourceId, data);

  return db(PERSON_NAME_SOURCE_CITATION_TABLE)
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

export function attachPersonEvent(personId, eventId) {
  const id = generateUuid();

  return db(PERSON_EVENT_TABLE)
    .insert({ id, person_id: personId, event_id: eventId }, '*')
    .then(returnFirst);
}

export function attachPersonNote(personId, noteId) {
  const id = generateUuid();

  return db(PERSON_NOTE_TABLE)
    .insert({ id, person_id: personId, note_id: noteId }, '*')
    .then(returnFirst);
}

export function attachPersonNameNote(personNameId, noteId) {
  const id = generateUuid();

  return db(PERSON_NAME_NOTE_TABLE)
    .insert({ id, person_name_id: personNameId, note_id: noteId }, '*')
    .then(returnFirst);
}

export function attachPersonRelationship(personId, relationshipId) {
  const id = generateUuid();

  return db(PERSON_RELATIONSHIPS_TABLE)
    .insert({ id, person_id: personId, relationship_id: relationshipId }, '*')
    .then(returnFirst);
}
