import Mutation from './mutation';
import Query from './query';
import schema from './schema';

const resolvers = {
  Mutation,
  Query,
  SourceCitation: {
    source({ source_id }, params, context) {
      return context.dataLoaders.source.sourceLoader.load(source_id);
    },
  },
};

export { schema, resolvers };
