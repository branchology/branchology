import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { resolvers, typeDefs } from 'api';
import DataLoaders from 'api/DataLoaders';
import 'config';

import * as yup from 'yup';

const { APP_PORT } = process.env;

const app = express();
app.use(cors());

const yupValidation = {
  async Mutation(resolve, root, args, context, info) {
    const mutationField = info.schema.getMutationType().getFields()[
      info.fieldName
    ];

    const mutationValidationSchema = mutationField.validationSchema;

    if (mutationValidationSchema) {
      try {
        await mutationValidationSchema.validate(args, {
          abortEarly: false,
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return {
            error: { message: error.message, details: error.errors },
          };
        } else {
          throw error;
        }
      }
    }

    return resolve(root, args, context, info);
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const schemaWithMiddleware = applyMiddleware(schema, yupValidation);

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
