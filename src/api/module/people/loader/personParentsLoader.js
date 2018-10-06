import DataLoader from 'dataloader';
import { findPersonParentsByIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findPersonParentsByIds(ids).then(names =>
    organizeMultipleResultsById(names, ids, 'person_id'),
  ),
);
