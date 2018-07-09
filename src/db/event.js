import db from './conn';
import {
  EVENT_TABLE,
  EVENT_NOTE_TABLE,
  EVENT_SOURCE_CITATION_TABLE,
  NOTE_TABLE,
  SOURCE_CITATION_TABLE,
} from './constants';
import { createSourceCitation } from './source';
import { generateUuid, returnFirst } from '../lib';

export function findEventCitationsByEventIds(ids) {
  return db
    .select('sc.*')
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

export async function createEvent(type, data) {
  const { date, place, placeId, isPreferred = true } = data;

  let dbPlaceId;
  if (place || placeId) {
    dbPlaceId = placeId;
    if (place) {
      const newPlace = await createPlace({ description: birthPlace });
      dbPlaceId = newPlace.id;
    }
  }

  const { postalCode, stateProvince, ...otherPlaceData } = data;

  const eventId = generateUuid();

  return db(EVENT_TABLE)
    .insert(
      {
        id: eventId,
        type,
        date,
        place_id: dbPlaceId,
        is_preferred: isPreferred,
      },
      '*',
    )
    .then(returnFirst);
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
