import { sourceLoader } from './loader';
import schema from './schema';

console.log({ sourceLoader });

const resolvers = {
  SourceCitation: {
    source({ source_id }) {
      return sourceLoader.load(source_id);
    },
  },
};

export { schema, resolvers };
