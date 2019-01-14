import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import path from 'path';
import { resolvers, typeDefs } from 'api';
import DataLoaders from 'api/DataLoaders';
import ProtectedDirective from 'api/directives/ProtectedDirective';
import ValidationMiddleware from 'api/middleware/ValidationMiddleware';
import config from './config';

// TODO: FIXME:
import db from 'db/conn';
import Event from 'db/Event';
import Person from 'db/Person';
import Place from 'db/Place';
import Source from 'db/Source';
import Relationship from 'db/Relationship';
import User from 'db/User';

const app = express();
app.use(cors());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    protected: ProtectedDirective,
  },
});
const schemaWithMiddleware = applyMiddleware(schema, ValidationMiddleware);

function isPublic(dates) {
  const now = new Date();

  return dates
    .map(date => {
      return date && new Date(date) <= now;
    })
    .reduce((reduced, date) => reduced && date, true);
}

class Context {
  constructor(request) {
    this.request = request;
    this.dbal = {
      event: new Event(db),
      person: new Person(db),
      place: new Place(db),
      source: new Source(db),
      relationship: new Relationship(db),
      user: new User(db),
    };
    this.dataLoaders = new DataLoaders(this.dbal);
  }

  getUser = async () => {
    if ('authorization' in this.request.headers) {
      const token = await this.dbal.user.findTokenBy({
        token: this.request.headers.authorization.split(' ', 2)[1],
      });

      if (token && new Date(token.expires) > new Date()) {
        return this.dbal.user.findUserByIds([token.user_id]);
      }
    }
  };

  conceal = async (publicDates, allow, deny) => {
    const user = await this.getUser();

    if (user) {
      return allow;
    }

    return isPublic(Array.isArray(publicDates) ? publicDates : [publicDates])
      ? allow
      : deny;
  };
}

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({ req }) => new Context(req),
});

server.applyMiddleware({ app });

if (config.environment === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

app.listen({ port: config.port }, () =>
  console.log(
    `🎉 Server ready at http://localhost:${config.port}${server.graphqlPath}`,
  ),
);
