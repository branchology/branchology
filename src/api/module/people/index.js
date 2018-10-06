import { findEventById, findPersonAttributesByPerson } from 'db';
import {
  personCitationLoader,
  personEventLoader,
  personNameCitationLoader,
  personNameLoader,
  personNameNoteLoader,
  personNoteLoader,
  personParentsLoader,
  personPreferredEventLoader,
  personPreferredNameLoader,
  personRelationshipLoader,
} from './loader';
import {
  addPersonAttribute,
  addPersonEvent,
  updateAttribute,
} from './mutation';
import { person, people } from './query';
import schema from './schema';

const resolvers = {
  Mutation: {
    addPersonAttribute,
    addPersonEvent,
    updateAttribute,
  },
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
  Attribute: {
    event({ event_id }) {
      return findEventById(event_id);
    },
  },
  Person: {
    attributes({ id }) {
      return findPersonAttributesByPerson(id);
    },
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
    parents({ id }) {
      return personParentsLoader.load(id);
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
