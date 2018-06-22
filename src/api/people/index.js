import { personEventLoader, personNameLoader } from './loader';
import { person, people } from './query';
import schema from './schema';

const resolvers = {
  Query: {
    person,
    people,
  },
  Person: {
    events({ id }) {
      return personEventLoader.load(id);
    },
    names({ id }) {
      return personNameLoader.load(id);
    },
  },
  PersonEvent: {
    type({ type }) {
      return type.toUpperCase();
    },
  },
};

export { schema, resolvers };
