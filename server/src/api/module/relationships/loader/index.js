import DataLoader from 'dataloader';
import {
  findChildrenByRelationshipIds,
  findRelationshipEventsByRelationshipIds,
  findRelationshipsByIds,
  findRelationshipPersons,
  findRelationshipPrimaryEventsByRelationshipIdAndType,
} from 'db';
import {
  dbToGraphQL,
  organizeMultipleResultsById,
  organizeResultsById,
} from 'lib';

export default class RelationshipLoader {
  constructor(db) {
    this.childrenLoader = new DataLoader(ids =>
      findChildrenByRelationshipIds(ids)
        .then(dbToGraphQL)
        .then(children =>
          organizeMultipleResultsById(children, ids, 'relationshipId'),
        ),
    );

    this.relationshipEventLoader = new DataLoader(ids =>
      findRelationshipEventsByRelationshipIds(ids).then(events =>
        organizeMultipleResultsById(events, ids, 'relationshipId'),
      ),
    );

    this.relationshipLoader = new DataLoader(ids =>
      findRelationshipsByIds(ids).then(relationships =>
        organizeResultsById(relationships, ids),
      ),
    );

    this.relationshipPeopleLoader = new DataLoader(ids =>
      findRelationshipPersons(ids)
        .then(dbToGraphQL)
        .then(events =>
          organizeMultipleResultsById(events, ids, 'relationshipId'),
        ),
    );

    this.relationshipPreferredEventLoader = new DataLoader(pairs =>
      findRelationshipPrimaryEventsByRelationshipIdAndType(pairs).then(
        events => {
          return pairs.map(([id, type]) => {
            return events.find(
              result =>
                result.relationshipId === id &&
                result.type.toLowerCase() === type.toLowerCase(),
            );
          });
        },
      ),
    );
  }
}
