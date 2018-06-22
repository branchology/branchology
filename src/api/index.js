import { makeExecutableSchema } from 'graphql-tools';
import { schema as baseSchema } from './base';
import { resolvers as peopleResolvers, schema as peopleSchema } from './people';
import { resolvers as placeResolvers, schema as placeSchema } from './place';

const typeDefs = [baseSchema, placeSchema, peopleSchema];

export default makeExecutableSchema({
  typeDefs,
  resolvers: { ...placeResolvers, ...peopleResolvers },
});
