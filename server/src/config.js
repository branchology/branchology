import dotenv from 'dotenv';
import path from 'path';

const cwd = process.cwd();

const configPath =
  cwd.substr(cwd.length - 3) === 'src'
    ? path.resolve('..', '..', '.env')
    : path.resolve('..', '.env');

const config = dotenv.config({ path: configPath });
