import DataLoader from 'dataloader';
import { findRelationshipEventsByRelationshipIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findRelationshipEventsByRelationshipIds(ids).then(events =>
    organizeMultipleResultsById(events, ids, 'relationship_id'),
  ),
);
