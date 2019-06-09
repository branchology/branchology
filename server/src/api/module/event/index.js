import Query from './query';
import schema from './schema';

const resolvers = {
  Event: {
    place({ placeId }, params, context) {
      return placeId
        ? context.dataLoaders.event.placeLoader.load(placeId)
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
