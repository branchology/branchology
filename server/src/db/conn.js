import knex from 'knex';
import knexConfig from '../knexfile';
import { dbToGraphQL } from './lib';

const testConfig = {
  client: 'pg',
  debug: false,
  postProcessResponse: result => {
    return dbToGraphQL(result);
  },
};

export default knex(process.env.NODE_ENV === 'test' ? testConfig : knexConfig);
