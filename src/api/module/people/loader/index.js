import DataLoader from 'dataloader';
import { findPersonParentsByIds } from 'db';
import Person from 'db/Person';
import { organizeMultipleResultsById, organizeResultsById } from 'lib';

export default class PeopleLoader {
  constructor(db) {
    const person = new Person(db);

    this.personCitationLoader = new DataLoader(ids =>
      person
        .findCitationsByPersonIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'person_id'),
        ),
    );
    this.personEventCitationLoader = new DataLoader(ids =>
      person
        .findEventCitationsByPersonIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'person_event_id'),
        ),
    );
    this.personEventLoader = new DataLoader(ids =>
      person
        .findEventsByPersonIds(ids)
        .then(events => organizeMultipleResultsById(events, ids, 'person_id')),
    );
    this.personEventNoteLoader = new DataLoader(ids =>
      person
        .findEventNotesByPersonEventIds(ids)
        .then(notes =>
          organizeMultipleResultsById(notes, ids, 'person_event_id'),
        ),
    );
    this.personLoader = new DataLoader(ids =>
      person.findByIds(ids).then(people => organizeResultsById(people, ids)),
    );
    this.personNameCitationLoader = new DataLoader(ids =>
      person
        .findNameCitationsByPersonIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'person_name_id'),
        ),
    );

    this.personNameLoader = new DataLoader(ids =>
      person
        .findNamesByPersonIds(ids)
        .then(names => organizeMultipleResultsById(names, ids, 'person_id')),
    );

    this.personNameNoteLoader = new DataLoader(ids =>
      person
        .findNameNotesByPersonNameIds(ids)
        .then(notes =>
          organizeMultipleResultsById(notes, ids, 'person_name_id'),
        ),
    );
    this.personNoteLoader = new DataLoader(ids =>
      person
        .findNotesByPersonIds(ids)
        .then(notes => organizeMultipleResultsById(notes, ids, 'person_id')),
    );
    this.personParentsLoader = new DataLoader(ids =>
      findPersonParentsByIds(ids).then(names =>
        organizeMultipleResultsById(names, ids, 'person_id'),
      ),
    );
    this.personPreferredEventLoader = new DataLoader(pairs =>
      person.findPrimaryEventsByPersonIdAndType(pairs).then(events => {
        return pairs.map(([id, type]) => {
          return events.find(
            result => result.person_id === id && result.type === type,
          );
        });
      }),
    );

    this.personPreferredNameLoader = new DataLoader(ids =>
      person
        .findPreferredNameByIds(ids)
        .then(names => organizeResultsById(names, ids, 'person_id')),
    );

    this.personRelationshipLoader = new DataLoader(ids =>
      person
        .findRelationshipsByPersonIds(ids)
        .then(relationships =>
          organizeMultipleResultsById(relationships, ids, 'person_id'),
        ),
    );
  }
}
