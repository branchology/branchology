import DataLoader from 'dataloader';
import { findPersonParentsByIds } from 'db';
import { organizeMultipleResultsById, organizeResultsById } from 'lib';

export default class PeopleLoader {
  constructor(dbal) {
    this.attributeNoteLoader = new DataLoader(ids =>
      dbal.person
        .findNotesByAttributeIds(ids)
        .then(notes =>
          organizeMultipleResultsById(notes, ids, 'person_attribute_id'),
        ),
    );

    this.attributeSourceCitationLoader = new DataLoader(ids =>
      dbal.person
        .findCitationsByAttributeIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'person_attribute_id'),
        ),
    );

    this.personCitationLoader = new DataLoader(ids =>
      dbal.person
        .findCitationsByPersonIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'person_id'),
        ),
    );
    this.personEventCitationLoader = new DataLoader(ids =>
      dbal.person
        .findEventCitationsByPersonIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'person_event_id'),
        ),
    );
    this.personEventLoader = new DataLoader(ids =>
      dbal.person
        .findEventsByPersonIds(ids)
        .then(events => organizeMultipleResultsById(events, ids, 'person_id')),
    );
    this.personEventNoteLoader = new DataLoader(ids =>
      dbal.person
        .findEventNotesByPersonEventIds(ids)
        .then(notes =>
          organizeMultipleResultsById(notes, ids, 'person_event_id'),
        ),
    );
    this.personLoader = new DataLoader(ids =>
      dbal.person
        .findByIds(ids)
        .then(people => organizeResultsById(people, ids)),
    );
    this.personNameCitationLoader = new DataLoader(ids =>
      dbal.person
        .findNameCitationsByPersonIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'person_name_id'),
        ),
    );

    this.personNameLoader = new DataLoader(ids =>
      dbal.person
        .findNamesByPersonIds(ids)
        .then(names => organizeMultipleResultsById(names, ids, 'person_id')),
    );

    this.personNameNoteLoader = new DataLoader(ids =>
      dbal.person
        .findNameNotesByPersonNameIds(ids)
        .then(notes =>
          organizeMultipleResultsById(notes, ids, 'person_name_id'),
        ),
    );
    this.personNoteLoader = new DataLoader(ids =>
      dbal.person
        .findNotesByPersonIds(ids)
        .then(notes => organizeMultipleResultsById(notes, ids, 'person_id')),
    );
    this.personParentsLoader = new DataLoader(ids =>
      findPersonParentsByIds(ids).then(names =>
        organizeMultipleResultsById(names, ids, 'person_id'),
      ),
    );
    this.personPreferredEventLoader = new DataLoader(pairs =>
      dbal.person
        .findPrimaryEventsByPersonIdAndType(pairs)
        .then(events =>
          pairs.map(([id, type]) =>
            events.find(
              result =>
                result.person_id === id && result.type.toLowerCase() === type,
            ),
          ),
        ),
    );

    this.personPreferredNameLoader = new DataLoader(ids =>
      dbal.person
        .findPreferredNameByIds(ids)
        .then(names => organizeResultsById(names, ids, 'person_id')),
    );

    this.personRelationshipLoader = new DataLoader(ids =>
      dbal.person
        .findRelationshipsByPersonIds(ids)
        .then(relationships =>
          organizeMultipleResultsById(relationships, ids, 'person_id'),
        ),
    );
  }
}
