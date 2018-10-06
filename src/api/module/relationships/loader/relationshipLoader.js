import DataLoader from 'dataloader';
import { findRelationshipsByIds } from 'db';
import { organizeResultsById } from 'lib';

export default new DataLoader(ids =>
  findRelationshipsByIds(ids).then(relationships =>
    organizeResultsById(relationships, ids),
  ),
);
