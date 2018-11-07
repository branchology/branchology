import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { resolvers, typeDefs } from 'api';
import DataLoaders from 'api/DataLoaders';
import ValidationMiddleware from 'api/middleware/ValidationMiddleware';
import 'config';

const { APP_PORT } = process.env;

const app = express();
app.use(cors());

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, ValidationMiddleware);

class Context {
  constructor(request) {
    this.request = request;
    this.dataLoaders = new DataLoaders();
  }
}

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: req => new Context(req),
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: APP_PORT }, () =>
  console.log(
    `🎉 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`,
  ),
);
