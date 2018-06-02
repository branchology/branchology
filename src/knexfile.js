import 'config';

const {
  DATABASE_DEBUG = false,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASS,
} = process.env;

module.exports = {
  client: 'pg',
  debug: DATABASE_DEBUG,
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE_NAME,
  },
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
