import {
  eventSourceCitationLoader,
  eventNoteLoader,
  placeLoader,
} from './loader';
import schema from './schema';

const resolvers = {
  Event: {
    place({ place_id }) {
      return place_id ? placeLoader.load(place_id) : null;
    },
    notes({ id }) {
      return eventNoteLoader.load(id);
    },
    sourceCitations({ id }) {
      return eventSourceCitationLoader.load(id);
    },
  },
};

export { schema, resolvers };
