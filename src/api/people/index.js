import {
  personCitationLoader,
  personEventLoader,
  personNameCitationLoader,
  personNameLoader,
  personNameNoteLoader,
  personNoteLoader,
  personPreferredEventLoader,
  personPreferredNameLoader,
  personRelationshipLoader,
} from './loader';
import { person, people } from './query';
import schema from './schema';

const resolvers = {
  Query: {
    person,
    people,
  },
  Name: {
    notes({ id }) {
      return personNameNoteLoader.load(id);
    },
    sourceCitations({ id }) {
      return personNameCitationLoader.load(id);
    },
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
    name({ id }) {
      return personPreferredNameLoader.load(id);
    },
    names({ id }) {
      return personNameLoader.load(id);
    },
    notes({ id }) {
      return personNoteLoader.load(id);
    },
    relationships({ id }) {
      return personRelationshipLoader.load(id);
    },
    sourceCitations({ id }) {
      return personCitationLoader.load(id);
    },
  },
};

export { schema, resolvers };
