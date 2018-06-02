import { makeExecutableSchema } from 'graphql-tools';
import { schema as baseSchema } from './base';
import { resolvers as peopleResolvers, schema as peopleSchema } from './people';

const typeDefs = [baseSchema, peopleSchema];

export default makeExecutableSchema({
  typeDefs,
  resolvers: { ...peopleResolvers },
});
