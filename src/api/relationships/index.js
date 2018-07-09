import {
  relationshipEventLoader,
  relationshipPeopleLoader,
  relationshipPreferredEventLoader,
} from './loader';
import schema from './schema';

const resolvers = {
  Relationship: {
    events({ id }) {
      return relationshipEventLoader.load(id);
    },
    marriage({ id }) {
      return relationshipPreferredEventLoader.load([id, 'marr']);
    },
    people({ id }) {
      return relationshipPeopleLoader.load(id);
    },
  },
};

export { schema, resolvers };
