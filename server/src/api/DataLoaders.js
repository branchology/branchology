import path from 'path';
import requireDir from 'lib/requireDir';
import db from 'db/conn';

class DataLoaders {
  constructor() {
    const loaders = requireDir(
      path.resolve(__dirname, 'module', '*', 'loader'),
    );

    for (const loader in loaders) {
      this[loader] = new loaders[loader].default(db);
    }
  }
}

export default DataLoaders;
