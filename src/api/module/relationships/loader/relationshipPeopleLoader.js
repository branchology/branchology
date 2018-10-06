import DataLoader from 'dataloader';
import { findRelationshipPersons } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findRelationshipPersons(ids).then(events =>
    organizeMultipleResultsById(events, ids, 'relationship_id'),
  ),
);
