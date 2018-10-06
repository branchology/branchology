import DataLoader from 'dataloader';
import { findChildrenByRelationshipIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findChildrenByRelationshipIds(ids).then(children =>
    organizeMultipleResultsById(children, ids, 'relationship_id'),
  ),
);
