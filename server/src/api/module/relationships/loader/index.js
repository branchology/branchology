import DataLoader from 'dataloader';
import {
  findChildrenByRelationshipIds,
  findRelationshipEventsByRelationshipIds,
  findRelationshipsByIds,
  findRelationshipPersons,
  findRelationshipPrimaryEventsByRelationshipIdAndType,
} from 'db';
import { organizeMultipleResultsById, organizeResultsById } from 'lib';

export default class RelationshipLoader {
  constructor(db) {
    this.childrenLoader = new DataLoader(ids =>
      findChildrenByRelationshipIds(ids).then(children =>
        organizeMultipleResultsById(children, ids, 'relationship_id'),
      ),
    );

    this.relationshipEventLoader = new DataLoader(ids =>
      findRelationshipEventsByRelationshipIds(ids).then(events =>
        organizeMultipleResultsById(events, ids, 'relationship_id'),
      ),
    );

    this.relationshipLoader = new DataLoader(ids =>
      findRelationshipsByIds(ids).then(relationships =>
        organizeResultsById(relationships, ids),
      ),
    );

    this.relationshipPeopleLoader = new DataLoader(ids =>
      findRelationshipPersons(ids).then(events =>
        organizeMultipleResultsById(events, ids, 'relationship_id'),
      ),
    );

    this.relationshipPreferredEventLoader = new DataLoader(pairs =>
      findRelationshipPrimaryEventsByRelationshipIdAndType(pairs).then(
        events => {
          return pairs.map(([id, type]) => {
            return events.find(
              result =>
                result.relationship_id === id &&
                result.type.toLowerCase() === type.toLowerCase(),
            );
          });
        },
      ),
    );
  }
}
