import DataLoader from 'dataloader';
import Event from 'db/Event';
import Place from 'db/Place';
import { organizeMultipleResultsById, organizeResultsById } from 'lib';

export default class EventLoader {
  constructor(db) {
    const event = new Event(db);
    const place = new Place(db);

    this.eventsById = new DataLoader(ids =>
      event
        .findEventsByIds(ids)
        .then(events => organizeResultsById(events, ids)),
    );

    this.attributesById = new DataLoader(ids =>
      event
        .findPersonAttributesByPersonIds(ids)
        .then(attrs => organizeMultipleResultsById(attrs, ids, 'person_id')),
    );

    this.eventNoteLoader = new DataLoader(ids =>
      event
        .findNotesByEventIds(ids)
        .then(notes => organizeMultipleResultsById(notes, ids, 'event_id')),
    );

    this.eventSourceCitationLoader = new DataLoader(ids =>
      event
        .findCitationsByEventIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'event_id'),
        ),
    );

    this.placeLoader = new DataLoader(ids =>
      place.findByIds(ids).then(places => organizeResultsById(places, ids)),
    );
  }
}
