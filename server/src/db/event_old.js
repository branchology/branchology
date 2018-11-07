import db from './conn';
import {
  EVENT_TABLE,
  EVENT_NOTE_TABLE,
  EVENT_SOURCE_CITATION_TABLE,
  NOTE_TABLE,
  SOURCE_CITATION_TABLE,
  PERSON_ATTRIBUTE_TABLE,
} from './constants';
import {
  calculateDateStamp,
  formatDbValues,
  generateUuid,
  returnFirst,
} from '../lib';
import { createPlace } from './place';
import { createSourceCitation } from './source';

export function findEventCitationsByEventIds(ids) {
  return db
    .select(['sc.*', 'event_id'])
    .from(`${EVENT_SOURCE_CITATION_TABLE} AS esc`)
    .join(`${SOURCE_CITATION_TABLE} AS sc`, 'sc.id', 'esc.source_citation_id')
    .whereIn('event_id', ids);
}

export function findEventNotesByEventIds(ids) {
  return db
    .select(['n.*'])
    .from(`${EVENT_NOTE_TABLE} AS en`)
    .join(`${NOTE_TABLE} as n`, 'n.id', 'en.note_id')
    .whereIn('event_id', ids);
}

export function findPersonAttributesByPerson(personId) {
  return db(PERSON_ATTRIBUTE_TABLE)
    .select('*')
    .where('person_id', personId);
}

export function findEventById(id) {
  return db(EVENT_TABLE)
    .select('*')
    .where('id', id)
    .then(returnFirst);
}

export async function createAttribute(personId, attrData) {
  const {
    data,
    event: { type, ...eventData },
  } = attrData;

  const event = await createEvent(type, eventData);

  return db(PERSON_ATTRIBUTE_TABLE)
    .insert(
      {
        id: generateUuid(),
        event_id: event.id,
        person_id: personId,
        data,
      },
      '*',
    )
    .then(returnFirst);
}

export async function updateAttribute(id, attrData) {
  const { event, ...data } = attrData;

  const attribute = await db(PERSON_ATTRIBUTE_TABLE)
    .update(formatDbValues(data), '*')
    .where('id', id)
    .then(returnFirst);

  const { id: eventId, ...eventData } = event;

  return updateEvent(eventId, eventData).then(() => attribute);
}

export async function updateEvent(id, event) {
  const { place, ...eventData } = event;

  if (place) {
    const newPlace = await createPlace({ description: place });
    eventData.placeId = newPlace.id;
  }

  if (eventData.date) {
    eventData.dateStamp = calculateDateStamp(eventData.date);
  }

  return db(EVENT_TABLE)
    .update(formatDbValues(eventData), '*')
    .where('id', id)
    .then(returnFirst);
}

export async function createEvent(type, data) {
  const { date, place, placeId, isPreferred = true, sources = [] } = data;

  let dbPlaceId;
  if (place || placeId) {
    dbPlaceId = placeId;
    if (place) {
      const newPlace = await createPlace({ description: place });
      dbPlaceId = newPlace.id;
    }
  }

  const { postalCode, stateProvince, ...otherPlaceData } = data;

  const eventId = generateUuid();

  const eventData = {
    id: eventId,
    type,
    date,
    placeId: dbPlaceId,
    isPreferred,
  };

  if (eventData.date) {
    eventData.dateStamp = calculateDateStamp(eventData.date);
  }

  const event = await db(EVENT_TABLE)
    .insert(formatDbValues(eventData), '*')
    .then(returnFirst);

  return Promise.all(
    sources.map(({ sourceId, ...data }) => {
      return addEventSourceCitation(event.id, sourceId, data);
    }),
  ).then(() => event);
}

export function attachEventNote(eventId, noteId) {
  const id = generateUuid();

  return db(EVENT_NOTE_TABLE)
    .insert({ id, event_id: eventId, note_id: noteId }, '*')
    .then(returnFirst);
}

export async function addEventSourceCitation(eventId, sourceId, data) {
  const id = generateUuid();

  const citation = await createSourceCitation(sourceId, data);

  return db(EVENT_SOURCE_CITATION_TABLE)
    .insert(
      {
        id,
        event_id: eventId,
        source_citation_id: citation.id,
      },
      '*',
    )
    .then(returnFirst);
}
