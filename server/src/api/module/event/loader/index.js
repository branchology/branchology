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
        .then(attrs => organizeMultipleResultsById(attrs, ids, 'person_id')),
    );

    this.eventNoteLoader = new DataLoader(ids =>
      dbal.event
        .findNotesByEventIds(ids)
        .then(notes => organizeMultipleResultsById(notes, ids, 'event_id')),
    );

    this.eventSourceCitationLoader = new DataLoader(ids =>
      dbal.event
        .findCitationsByEventIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'event_id'),
        ),
    );

    this.placeLoader = new DataLoader(ids =>
      dbal.place
        .findByIds(ids)
        .then(places => organizeResultsById(places, ids)),
    );
  }
}
