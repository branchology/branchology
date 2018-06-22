import { makeExecutableSchema } from 'graphql-tools';
import { schema as baseSchema } from './base';
import { resolvers as peopleResolvers, schema as peopleSchema } from './people';
import { resolvers as placeResolvers, schema as placeSchema } from './place';
import { resolvers as sourceResolvers, schema as sourceSchema } from './source';

const typeDefs = [baseSchema, sourceSchema, placeSchema, peopleSchema];

export default makeExecutableSchema({
  typeDefs,
  resolvers: { ...sourceResolvers, ...placeResolvers, ...peopleResolvers },
});
