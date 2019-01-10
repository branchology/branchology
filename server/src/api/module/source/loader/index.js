import DataLoader from 'dataloader';
import { organizeResultsById } from 'lib';

export default class SourceLoader {
  constructor(dbal) {
    this.sourceLoader = new DataLoader(ids =>
      dbal.source
        .findSourceByIds(ids)
        .then(sources => organizeResultsById(sources, ids)),
    );
  }
}
