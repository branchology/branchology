import Mutation from './mutation';
import Query from './query';
import schema from './schema';

const resolvers = {
  Mutation,
  Query,
  Name: {
    isPreferred({ is_preferred }) {
      // TODO: FIXME:
      return is_preferred;
    },
    notes({ id }, params, context) {
      return context.dataLoaders.people.personNameNoteLoader.load(id);
    },
    sourceCitations({ id }, params, context) {
      return context.dataLoaders.people.personNameCitationLoader.load(id);
    },
  },
  Attribute: {
    event({ event_id }, params, context) {
      return context.dataLoaders.event.eventsById.load(event_id);
    },
  },
  Person: {
    attributes({ id }, params, context) {
      return context.dataLoaders.event.attributesById.load(id);
    },
    birth({ id }, params, context) {
      return context.dataLoaders.people.personPreferredEventLoader.load([
        id,
        'birt',
      ]);
    },
    death({ id }, params, context) {
      return context.dataLoaders.people.personPreferredEventLoader.load([
        id,
        'deat',
      ]);
    },
    events({ id }, params, context) {
      return context.dataLoaders.people.personEventLoader.load(id);
    },
    name({ id }, params, context) {
      return context.dataLoaders.people.personPreferredNameLoader.load(id);
    },
    names({ id }, params, context) {
      return context.dataLoaders.people.personNameLoader.load(id);
    },
    notes({ id }, params, context) {
      return context.dataLoaders.people.personNoteLoader.load(id);
    },
    parents({ id }, params, context) {
      return context.dataLoaders.people.personParentsLoader.load(id);
    },
    relationships({ id }, params, context) {
      return context.dataLoaders.people.personRelationshipLoader.load(id);
    },
    sourceCitations({ id }, params, context) {
      return context.dataLoaders.people.personCitationLoader.load(id);
    },
  },
};

export { schema, resolvers };
