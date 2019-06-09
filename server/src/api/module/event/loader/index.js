import DataLoader from 'dataloader';
import { organizeMultipleResultsById, organizeResultsById } from 'lib';

export default class EventLoader {
  constructor(dbal) {
    this.eventsById = new DataLoader(ids =>
      dbal.event
        .findEventsByIds(ids)
        .then(events => organizeResultsById(events, ids)),
    );

    this.attributesById = new DataLoader(ids =>
      dbal.event
        .findPersonAttributesByPersonIds(ids)
        .then(attrs => organizeMultipleResultsById(attrs, ids, 'personId')),
    );

    this.eventNoteLoader = new DataLoader(ids =>
      dbal.event
        .findNotesByEventIds(ids)
        .then(notes => organizeMultipleResultsById(notes, ids, 'eventId')),
    );

    this.eventSourceCitationLoader = new DataLoader(ids =>
      dbal.event
        .findCitationsByEventIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'eventId'),
        ),
    );

    this.placeLoader = new DataLoader(ids =>
      dbal.place
        .findByIds(ids)
        .then(places => organizeResultsById(places, ids)),
    );
  }
}
