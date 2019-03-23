import { generateUuid } from 'lib';
import Mutation from './mutation';
import Query from './query';
import schema from './schema';

const resolvers = {
  Mutation,
  Query,
  EventPayload: {
    person({ personId }, args, context) {
      return context.dataLoaders.people.personLoader.load(personId);
    },
  },
  RemovePersonRecordPayload: {
    person({ personId }, args, context) {
      return context.dataLoaders.people.personLoader.load(personId);
    },
  },
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
    place({ place_id }, params, context) {
      return place_id
        ? context.dataLoaders.event.placeLoader.load(place_id)
        : null;
    },
    notes({ id }, params, context) {
      return context.dataLoaders.people.attributeNoteLoader.load(id);
    },
    sourceCitations({ id }, params, context) {
      return context.dataLoaders.people.attributeSourceCitationLoader.load(id);
    },
  },
  Person: {
    attributes({ id, maxPublicDate }, params, context) {
      return context.conceal(
        maxPublicDate,
        context.dataLoaders.event.attributesById.load(id),
        [],
      );
    },
    birth({ id, maxPublicDate }, params, context) {
      return context.conceal(
        maxPublicDate,
        context.dataLoaders.people.personPreferredEventLoader.load([
          id,
          'birt',
        ]),
        null,
      );
    },
    death({ id }, params, context) {
      return context.dataLoaders.people.personPreferredEventLoader.load([
        id,
        'deat',
      ]);
    },
    events({ id, maxPublicDate }, params, context) {
      return context.conceal(
        maxPublicDate,
        context.dataLoaders.people.personEventLoader.load(id),
        [],
      );
    },
    name(person, params, context) {
      const { id, maxPublicDate } = person;
      return context.conceal(
        maxPublicDate,
        context.dataLoaders.people.personPreferredNameLoader.load(id),
        { id: generateUuid(), given: 'Living', surname: 'Person' },
      );
    },
    names({ id, maxPublicDate }, params, context) {
      return context.conceal(
        maxPublicDate,
        context.dataLoaders.people.personNameLoader.load(id),
        [{ id: generateUuid(), given: 'Living', surname: 'Person' }],
      );
    },
    notes({ id, maxPublicDate }, params, context) {
      return context.conceal(
        maxPublicDate,
        context.dataLoaders.people.personNoteLoader.load(id),
        [],
      );
    },
    parents({ id }, params, context) {
      return context.dataLoaders.people.personParentsLoader.load(id);
    },
    relationships({ id }, params, context) {
      return context.dataLoaders.people.personRelationshipLoader.load(id);
    },
    sourceCitations({ id, maxPublicDate }, params, context) {
      return context.conceal(
        maxPublicDate,
        context.dataLoaders.people.personCitationLoader.load(id),
        [],
      );
    },
  },
};

export { schema, resolvers };
