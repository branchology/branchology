import {
  personCitationLoader,
  personEventCitationLoader,
  personEventNoteLoader,
  personEventLoader,
  personNameCitationLoader,
  personNameLoader,
  personNameNoteLoader,
  personNoteLoader,
  personPreferredEventLoader,
  personPreferredNameLoader,
} from './loader';
import { person, people } from './query';
import schema from './schema';
import { placeLoader } from '../place/loader';

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
    sourceCitations({ id }) {
      return personCitationLoader.load(id);
    },
  },
  PersonEvent: {
    type({ type }) {
      return type.toUpperCase();
    },
    place({ place_id }) {
      return placeLoader.load(place_id);
    },
    notes({ person_event_id: id }) {
      return personEventNoteLoader.load(id);
    },
    sourceCitations({ person_event_id }) {
      return personEventCitationLoader.load(person_event_id);
    },
  },
};

export { schema, resolvers };
