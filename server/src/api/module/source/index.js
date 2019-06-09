import Mutation from './mutation';
import Query from './query';
import schema from './schema';

const resolvers = {
  Mutation,
  Query,
  SourceCitation: {
    source({ sourceId }, params, context) {
      return context.dataLoaders.source.sourceLoader.load(sourceId);
    },
  },
};

export { schema, resolvers };
