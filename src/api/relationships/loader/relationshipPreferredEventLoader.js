import DataLoader from 'dataloader';
import { findRelationshipPrimaryEventsByRelationshipIdAndType } from 'db';

export default new DataLoader(pairs =>
  findRelationshipPrimaryEventsByRelationshipIdAndType(pairs).then(events => {
    return pairs.map(([id, type]) => {
      return events.find(
        result => result.relationship_id === id && result.type === type,
      );
    });
  }),
);
