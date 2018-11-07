import Mutation from './mutation';
import schema from './schema';

const resolvers = {
  Mutation,
  Child: {
    person({ person_id }, params, context) {
      return context.dataLoaders.people.personLoader.load(person_id);
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
    events({ id }, params, context) {
      return context.dataLoaders.relationships.relationshipEventLoader.load(id);
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
