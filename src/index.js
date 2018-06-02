import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import schema from 'api';
import 'config';

const { APP_PORT } = process.env;

const app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({ schema })));

app.listen(APP_PORT, () => {
  console.info(`GraphQL server is running on port ${APP_PORT}`);
});
