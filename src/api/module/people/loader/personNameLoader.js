import DataLoader from 'dataloader';
import { findPersonNamesByPersonIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findPersonNamesByPersonIds(ids).then(names =>
    organizeMultipleResultsById(names, ids, 'person_id'),
  ),
);
