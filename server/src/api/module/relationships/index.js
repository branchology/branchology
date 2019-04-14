import Mutation from './mutation';
import schema from './schema';

const resolvers = {
  Mutation,
  RelationshipEventPayload: {
    relationship({ relationshipId }, args, context) {
      return (
        relationshipId &&
        context.dataLoaders.relationships.relationshipLoader.load(
          relationshipId,
        )
      );
    },
  },
  RemoveRelationshipEventPayload: {
    relationship({ relationshipId }, args, context) {
      return (
        relationshipId &&
        context.dataLoaders.relationships.relationshipLoader.load(
          relationshipId,
        )
      );
    },
  },
  Child: {
    person({ personId }, params, context) {
      return context.dataLoaders.people.personLoader.load(personId);
    },
  },
  Parents: {
    relationship({ relationship_id }, params, context) {
      return context.dataLoaders.relationships.relationshipLoader.load(
        relationship_id,
      );
    },
  },
  Relationship: {
    children({ id }, params, context) {
      return context.dataLoaders.relationships.childrenLoader.load(id);
    },
    async events({ id }, params, context) {
      const people = await context.dataLoaders.relationships.relationshipPeopleLoader.load(
        id,
      );

      const publicDates = people.map(({ maxPublicDate }) => maxPublicDate);

      return context.conceal(
        publicDates,
        context.dataLoaders.relationships.relationshipEventLoader.load(id),
        [],
      );

      // return context.dataLoaders.relationships.relationshipEventLoader.load(id);
    },
    marriage({ id }, params, context) {
      return context.dataLoaders.relationships.relationshipPreferredEventLoader.load(
        [id, 'marr'],
      );
    },
    people({ id }, params, context) {
      return context.dataLoaders.relationships.relationshipPeopleLoader.load(
        id,
      );
    },
  },
};

export { schema, resolvers };
