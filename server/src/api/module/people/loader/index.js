import DataLoader from 'dataloader';
import {
  dbToGraphQL,
  organizeMultipleResultsById,
  organizeResultsById,
} from 'lib';

export default class PeopleLoader {
  constructor(dbal) {
    this.attributeNoteLoader = new DataLoader(ids =>
      dbal.person
        .findNotesByAttributeIds(ids)
        .then(notes =>
          organizeMultipleResultsById(notes, ids, 'personAttributeId'),
        ),
    );

    this.attributeSourceCitationLoader = new DataLoader(ids =>
      dbal.person
        .findCitationsByAttributeIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'personAttributeId'),
        ),
    );

    this.personCitationLoader = new DataLoader(ids =>
      dbal.person
        .findCitationsByPersonIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'personId'),
        ),
    );
    this.personEventCitationLoader = new DataLoader(ids =>
      dbal.person
        .findEventCitationsByPersonIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'personEventId'),
        ),
    );
    this.personEventLoader = new DataLoader(ids =>
      dbal.person
        .findEventsByPersonIds(ids)
        .then(events => organizeMultipleResultsById(events, ids, 'personId')),
    );
    this.personEventNoteLoader = new DataLoader(ids =>
      dbal.person
        .findEventNotesByPersonEventIds(ids)
        .then(notes =>
          organizeMultipleResultsById(notes, ids, 'personEventId'),
        ),
    );
    this.personLoader = new DataLoader(ids =>
      dbal.person
        .findByIds(ids)
        .then(dbToGraphQL)
        .then(people => organizeResultsById(people, ids)),
    );
    this.personNameCitationLoader = new DataLoader(ids =>
      dbal.person
        .findNameCitationsByPersonIds(ids)
        .then(citations =>
          organizeMultipleResultsById(citations, ids, 'personNameId'),
        ),
    );

    this.personNameLoader = new DataLoader(ids =>
      dbal.person
        .findNamesByPersonIds(ids)
        .then(names => organizeMultipleResultsById(names, ids, 'personId')),
    );

    this.personNameNoteLoader = new DataLoader(ids =>
      dbal.person
        .findNameNotesByPersonNameIds(ids)
        .then(notes => organizeMultipleResultsById(notes, ids, 'personNameId')),
    );
    this.personNoteLoader = new DataLoader(ids =>
      dbal.person
        .findNotesByPersonIds(ids)
        .then(notes => organizeMultipleResultsById(notes, ids, 'personId')),
    );
    this.personParentsLoader = new DataLoader(ids =>
      dbal.relationship
        .findPersonParentsByIds(ids)
        .then(names => organizeMultipleResultsById(names, ids, 'personId')),
    );
    this.personPreferredEventLoader = new DataLoader(pairs =>
      dbal.person
        .findPrimaryEventsByPersonIdAndType(pairs)
        .then(events =>
          pairs.map(([id, type]) =>
            events.find(
              result =>
                result.personId === id &&
                result.type.toLowerCase() === type.toLowerCase(),
            ),
          ),
        ),
    );

    this.personPreferredNameLoader = new DataLoader(ids =>
      dbal.person
        .findPreferredNameByIds(ids)
        .then(names => organizeResultsById(names, ids, 'personId')),
    );

    this.personRelationshipLoader = new DataLoader(ids =>
      dbal.person
        .findRelationshipsByPersonIds(ids)
        .then(relationships =>
          organizeMultipleResultsById(relationships, ids, 'personId'),
        ),
    );
  }
}
