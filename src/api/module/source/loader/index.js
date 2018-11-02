import DataLoader from 'dataloader';
import { findSourceByIds } from 'db';
import { organizeResultsById } from 'lib';

export default class SourceLoader {
  constructor(db) {
    this.sourceLoader = new DataLoader(ids =>
      findSourceByIds(ids).then(sources => organizeResultsById(sources, ids)),
    );
  }
}
