import { personNameLoader } from './loader';
import { person, people } from './query';
import schema from './schema';

const resolvers = {
  Query: {
    person,
    people,
  },
  Person: {
    names({ id }) {
      return personNameLoader.load(id);
    },
  },
};

export { schema, resolvers };
