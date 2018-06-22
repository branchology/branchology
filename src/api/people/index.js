import {
  personEventLoader,
  personNameLoader,
  personPreferredEventLoader,
} from './loader';
import { person, people } from './query';
import schema from './schema';

const resolvers = {
  Query: {
    person,
    people,
  },
  Person: {
    birth({ id }) {
      return personPreferredEventLoader.load([id, 'birt']);
    },
    death({ id }) {
      return personPreferredEventLoader.load([id, 'deat']);
    },
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
