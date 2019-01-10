import path from 'path';
import requireDir from 'lib/requireDir';

class DataLoaders {
  constructor(dbal) {
    const loaders = requireDir(
      path.resolve(__dirname, 'module', '*', 'loader'),
    );

    for (const loader in loaders) {
      this[loader] = new loaders[loader].default(dbal);
    }
  }
}

export default DataLoaders;
