import DataLoader from 'dataloader';
import { findPersonRelationshipsByPersonIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findPersonRelationshipsByPersonIds(ids).then(relationships =>
    organizeMultipleResultsById(relationships, ids, 'person_id'),
  ),
);
