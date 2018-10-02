import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from 'api';
import 'config';

const { APP_PORT } = process.env;

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: APP_PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`,
  ),
);
