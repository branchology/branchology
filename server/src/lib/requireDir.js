import fs from 'fs';
import glob from 'glob';

export default function requireDir(path) {
  const files = glob.sync(path);
  const loaders = {};

  for (const file of files) {
    const [, name] = new RegExp(path.replace('*', '(.*)')).exec(file);

    if (fs.existsSync(`${file}/index.js`)) {
      loaders[name] = require(file);
    }
  }

  return loaders;
}
