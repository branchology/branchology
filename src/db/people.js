import db from './conn';
import { generateUuid, returnFirst } from '../lib';
import { createEvent, EVENT_TABLE } from './event';
import { NOTE_TABLE } from './note';

export const PEOPLE_TABLE = 'people';
export const PERSON_CITATION_TABLE = 'person_sources';
export const PERSON_EVENT_CITATION_TABLE = 'person_event_sources';
export const PERSON_EVENT_TABLE = 'person_events';
export const PERSON_NAME_CITATION_TABLE = 'person_name_sources';
export const PERSON_NAME_TABLE = 'person_names';
export const PERSON_NOTE_TABLE = 'person_notes';
export const PERSON_EVENT_NOTE_TABLE = 'person_event_notes';
export const PERSON_NAME_NOTE_TABLE = 'person_name_notes';

export function findAllPeople(filter, sorting) {
  // TODO: Sorting + filtering
  return db.select(['*']).from(PEOPLE_TABLE);
}

export function findPersonCitationsByPersonIds(ids) {
  return db
    .select('*')
    .from(PERSON_CITATION_TABLE)
    .whereIn('person_id', ids);
}

export function findPersonEventsByPersonIds(ids) {
  return db
    .select(['e.*', 'pe.id AS person_event_id', 'pe.person_id'])
    .from(`${PERSON_EVENT_TABLE} as pe`)
    .join(`${EVENT_TABLE} as e`, 'e.id', 'pe.event_id')
    .whereIn('person_id', ids);
}

export function findPersonEventCitationsByPersonIds(ids) {
  return db
    .select('*')
    .from(PERSON_EVENT_CITATION_TABLE)
    .whereIn('person_event_id', ids);
}

export function findPersonNameCitationsByPersonIds(ids) {
  return db
    .select('*')
    .from(PERSON_NAME_CITATION_TABLE)
    .whereIn('person_name_id', ids);
}

export function findPersonNamesByPersonIds(ids) {
  return db
    .select(['*'])
    .from(PERSON_NAME_TABLE)
    .whereIn('person_id', ids);
}

export function findPersonEventNotesByPersonEventIds(ids) {
  return db
    .select(['n.*', 'pen.person_event_id'])
    .from(`${PERSON_EVENT_NOTE_TABLE} AS pen`)
    .join(`${NOTE_TABLE} as n`, 'n.id', 'pen.note_id')
    .whereIn('person_event_id', ids);
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

export function createPersonName(personId, nameData) {
  const nameId = generateUuid();

  return db(PERSON_NAME_TABLE)
    .insert(
      {
        id: nameId,
        person_id: personId,
        ...nameData,
      },
      '*',
    )
    .then(returnFirst);
}

export async function createPerson(data) {
  const {
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

  const personId = generateUuid();

  // create a person...
  const person = await db(PEOPLE_TABLE)
    .insert({ id: personId, sex, slug: `${given}-${surname}` }, '*')
    .then(returnFirst);

  const bagOfPromises = [];

  if (given || surname) {
    const nameId = generateUuid();
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

export function addPersonEventSourceCitation(personEventId, sourceId, data) {
  const id = generateUuid();
  const { citation } = data;

  return db(PERSON_EVENT_CITATION_TABLE)
    .insert(
      {
        id,
        person_event_id: personEventId,
        source_id: sourceId,
        citation,
      },
      '*',
    )
    .then(returnFirst);
}

export function addPersonSourceCitation(personId, sourceId, data) {
  const id = generateUuid();
  const { citation } = data;

  return db(PERSON_CITATION_TABLE)
    .insert(
      {
        id,
        person_id: personId,
        source_id: sourceId,
        citation,
      },
      '*',
    )
    .then(returnFirst);
}

export function addPersonNameSourceCitation(personNameId, sourceId, data) {
  const id = generateUuid();
  const { citation } = data;

  return db(PERSON_NAME_CITATION_TABLE)
    .insert(
      {
        id,
        person_name_id: personNameId,
        source_id: sourceId,
        citation,
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

export function attachPersonEventNote(personEventId, noteId) {
  const id = generateUuid();

  return db(PERSON_EVENT_NOTE_TABLE)
    .insert({ id, person_event_id: personEventId, note_id: noteId }, '*')
    .then(returnFirst);
}

export function attachPersonNameNote(personNameId, noteId) {
  const id = generateUuid();

  return db(PERSON_NAME_NOTE_TABLE)
    .insert({ id, person_name_id: personNameId, note_id: noteId }, '*')
    .then(returnFirst);
}
