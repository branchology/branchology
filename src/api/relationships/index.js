import {
  childrenLoader,
  relationshipEventLoader,
  relationshipLoader,
  relationshipPeopleLoader,
  relationshipPreferredEventLoader,
} from './loader';
import schema from './schema';
import { personLoader } from '../people/loader';

const resolvers = {
  Child: {
    person({ person_id }) {
      return personLoader.load(person_id);
    },
  },
  Parents: {
    relationship({ relationship_id }) {
      return relationshipLoader.load(relationship_id);
    },
  },
  Relationship: {
    children({ id }) {
      return childrenLoader.load(id);
    },
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
