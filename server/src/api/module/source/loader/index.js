import DataLoader from 'dataloader';
import Source from 'db/Source';
import { organizeResultsById } from 'lib';

export default class SourceLoader {
  constructor(db) {
    const source = new Source(db); // TODO: FIXME:

    this.sourceLoader = new DataLoader(ids =>
      source
        .findSourceByIds(ids)
        .then(sources => organizeResultsById(sources, ids)),
    );
  }
}
