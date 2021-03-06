import { calculateDateStamp, returnFirst } from 'lib';
import {
  EVENT_TABLE,
  EVENT_NOTE_TABLE,
  EVENT_SOURCE_CITATION_TABLE,
  NOTE_TABLE,
  SOURCE_CITATION_TABLE,
  PERSON_ATTRIBUTE_TABLE,
} from './constants';
import { dbToGraphQL, generateUuid, graphQLToDb } from './lib';
import Place from './Place';
import Source from './Source';

export default class Event {
  constructor(db) {
    this.db = db;
    this.place = new Place(db);
    this.source = new Source(db);
  }

  findCitationsByEventIds(ids) {
    return this.db
      .select(['sc.*', 'event_id'])
      .from(`${EVENT_SOURCE_CITATION_TABLE} AS esc`)
      .join(`${SOURCE_CITATION_TABLE} AS sc`, 'sc.id', 'esc.source_citation_id')
      .whereIn('event_id', ids)
      .then(dbToGraphQL);
  }

  findNotesByEventIds(ids) {
    return this.db
      .select(['n.*'])
      .from(`${EVENT_NOTE_TABLE} AS en`)
      .join(`${NOTE_TABLE} as n`, 'n.id', 'en.note_id')
      .whereIn('event_id', ids)
      .then(dbToGraphQL);
  }

  findPersonAttributesByPersonIds(ids) {
    return this.db(PERSON_ATTRIBUTE_TABLE)
      .select('*')
      .whereIn('person_id', ids)
      .then(dbToGraphQL);
  }

  findById(id) {
    return this.db(EVENT_TABLE)
      .select('*')
      .where('id', id)
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  findEventsByIds(ids) {
    return this.db(EVENT_TABLE)
      .select('*')
      .whereIn('id', ids)
      .then(dbToGraphQL);
  }

  async createAttribute(personId, attrData) {
    const {
      data,
      event: { type, ...eventData },
    } = attrData;

    const event = await this.createEvent(type, eventData);

    return this.db(PERSON_ATTRIBUTE_TABLE)
      .insert(
        graphQLToDb({
          id: generateUuid(),
          event_id: event.id,
          personId,
          data,
        }),
        '*',
      )
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  updateAttribute(id, attrData) {
    return this.db(PERSON_ATTRIBUTE_TABLE)
      .update(graphQLToDb(attrData), '*')
      .where('id', id)
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  async updateEvent(id, event) {
    const { place, ...eventData } = event;

    if (place) {
      const newPlace = await this.place.create({ description: place });
      eventData.placeId = newPlace.id;
    }

    if (eventData.date) {
      eventData.dateStamp = calculateDateStamp(eventData.date);
    }

    return this.db(EVENT_TABLE)
      .update(formatDbValues(eventData), '*')
      .where('id', id)
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  async createEvent(type, data) {
    const {
      date,
      place,
      placeId,
      postalCode,
      stateProvince,
      street,
      street2,
      city,
      country,
      isPreferred = true,
      sources = [],
      notes = [],
      ...extraData
    } = data;

    let dbPlaceId;
    if (place || placeId) {
      dbPlaceId = placeId;
      if (place) {
        const newPlace = await this.place.create({
          description: place,
          street,
          street2,
          city,
          stateProvince,
          postalCode,
          country,
        });
        dbPlaceId = newPlace.id;
      }
    }

    const eventId = generateUuid();

    const eventData = {
      id: eventId,
      type,
      date,
      placeId: dbPlaceId,
      isPreferred,
      ...extraData,
    };

    if (eventData.date) {
      eventData.dateStamp = calculateDateStamp(eventData.date);
    }

    const event = await this.db(EVENT_TABLE)
      .insert(graphQLToDb(eventData), '*')
      .then(returnFirst)
      .then(dbToGraphQL);

    return Promise.all(
      sources.map(({ sourceId, ...data }) => {
        return this.addSourceCitation(event.id, sourceId, data);
      }),
    ).then(() => event);
  }

  attachNote(eventId, noteId) {
    const id = generateUuid();

    return this.db(EVENT_NOTE_TABLE)
      .insert(graphQLToDb({ id, eventId, noteId }), '*')
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  addSourceCitation = async (eventId, sourceId, data) => {
    const id = generateUuid();

    const citation = await this.source.createSourceCitation(sourceId, data);

    return this.db(EVENT_SOURCE_CITATION_TABLE)
      .insert(
        graphQLToDb({
          id,
          eventId,
          source_citation_id: citation.id,
        }),
        '*',
      )
      .then(returnFirst)
      .then(dbToGraphQL);
  };
}
