import {
  eventSourceCitationLoader,
  eventNoteLoader,
  placeLoader,
} from './loader';
import schema from './schema';

const resolvers = {
  Event: {
    place({ place_id }) {
      return placeLoader.load(place_id);
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
