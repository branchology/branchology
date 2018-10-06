import DataLoader from 'dataloader';
import { findPeopleByIds } from 'db';
import { organizeResultsById } from 'lib';

export default new DataLoader(ids =>
  findPeopleByIds(ids).then(people => organizeResultsById(people, ids)),
);
