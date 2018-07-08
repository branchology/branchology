import {
  relationshipEventLoader,
  relationshipPeopleLoader,
  relationshipPreferredEventLoader,
} from './loader';
import schema from './schema';
import { placeLoader } from '../place/loader';

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
  RelationshipEvent: {
    place({ place_id }) {
      return placeLoader.load(place_id);
    },
    type({ type }) {
      return type.toUpperCase();
    },
  },
};

export { schema, resolvers };
