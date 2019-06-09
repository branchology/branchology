import Mutation from './mutation';
import schema from './schema';

function fetchRelationshipLoader({ relationshipId }, args, context) {
  return (
    relationshipId &&
    context.dataLoaders.relationships.relationshipLoader.load(relationshipId)
  );
}

function fetchPersonLoader({ personId }, args, context) {
  return personId && context.dataLoaders.people.personLoader.load(personId);
}

const resolvers = {
  Mutation,
  CreateChildPayload: {
    relationship: fetchRelationshipLoader,
  },
  CreateSpousePayload: {
    person: fetchPersonLoader,
  },
  RelationshipEventPayload: {
    relationship: fetchRelationshipLoader,
  },
  RemoveRelationshipEventPayload: {
    relationship: fetchRelationshipLoader,
  },
  Child: {
    person: fetchPersonLoader,
  },
  Parents: {
    relationship: fetchRelationshipLoader,
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
