import DataLoader from 'dataloader';
import { findSourceByIds } from 'db';
import { organizeResultsById } from 'lib';

export default new DataLoader(ids =>
  findSourceByIds(ids).then(sources => organizeResultsById(sources, ids)),
);
