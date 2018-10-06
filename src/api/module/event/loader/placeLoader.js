import DataLoader from 'dataloader';
import { findPlaceByIds } from 'db';
import { organizeResultsById } from 'lib';

export default new DataLoader(ids =>
  findPlaceByIds(ids).then(places => organizeResultsById(places, ids)),
);
