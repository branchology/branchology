import knex from 'knex';
import knexConfig from '../knexfile';

const testConfig = { client: 'pg', debug: false };

export default knex(process.env.NODE_ENV === 'test' ? testConfig : knexConfig);
