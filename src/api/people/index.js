import { person, people } from './query';
import schema from './schema';

const resolvers = {
  Query: {
    person,
    people,
  },
};

export { schema, resolvers };
