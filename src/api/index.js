import { makeExecutableSchema } from 'graphql-tools';
import { schema as baseSchema } from './base';
import { resolvers as eventResolvers, schema as eventSchema } from './event';
import { resolvers as noteResolvers, schema as noteSchema } from './note';
import { resolvers as peopleResolvers, schema as peopleSchema } from './people';
import {
  resolvers as relationshipResolvers,
  schema as relationshipSchema,
} from './relationships';
import { resolvers as sourceResolvers, schema as sourceSchema } from './source';

const typeDefs = [
  baseSchema,
  eventSchema,
  noteSchema,
  sourceSchema,
  peopleSchema,
  relationshipSchema,
];

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    ...eventResolvers,
    ...noteResolvers,
    ...sourceResolvers,
    ...peopleResolvers,
    ...relationshipResolvers,
  },
});
