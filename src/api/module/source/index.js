import { sourceLoader } from './loader';
import schema from './schema';

const resolvers = {
  SourceCitation: {
    source({ source_id }) {
      return sourceLoader.load(source_id);
    },
  },
};

export { schema, resolvers };
