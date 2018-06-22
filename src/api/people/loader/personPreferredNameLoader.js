import DataLoader from 'dataloader';
import { findPersonPreferredNameByIds } from 'db';
import { organizeResultsById } from 'lib';

export default new DataLoader(ids =>
  findPersonPreferredNameByIds(ids).then(names =>
    organizeResultsById(names, ids, 'person_id'),
  ),
);
