import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { resolvers, typeDefs } from 'api';
import DataLoaders from 'api/DataLoaders';
import ValidationMiddleware from 'api/middleware/ValidationMiddleware';
import 'config';

// TODO: FIXME:
import db from 'db/conn';
import Event from 'db/Event';
import Person from 'db/Person';
import Place from 'db/Place';
import Source from 'db/Source';
import Relationship from 'db/Relationship';

const { APP_PORT } = process.env;

const app = express();
app.use(cors());

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, ValidationMiddleware);

class Context {
  constructor(request) {
    this.request = request;
    this.dataLoaders = new DataLoaders();
    this.dbal = {
      event: new Event(db),
      person: new Person(db),
      place: new Place(db),
      source: new Source(db),
      relationship: new Relationship(db),
    };
  }
}

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: req => new Context(req),
});

server.applyMiddleware({ app });

app.listen({ port: APP_PORT }, () =>
  console.log(
    `🎉 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`,
  ),
);
