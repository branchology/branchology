import Query from './query';
import schema from './schema';

const resolvers = {
  Event: {
    isPreferred({ is_preferred }) {
      return is_preferred === true;
    },
    place({ place_id }, params, context) {
      return place_id
        ? context.dataLoaders.event.placeLoader.load(place_id)
        : null;
    },
    notes({ id }, params, context) {
      return context.dataLoaders.event.eventNoteLoader.load(id);
    },
    sourceCitations({ id }, params, context) {
      return context.dataLoaders.event.eventSourceCitationLoader.load(id);
    },
  },
  Query,
};

export { schema, resolvers };
