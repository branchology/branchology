import schema from './schema';

const resolvers = {
  SourceCitation: {
    source({ source_id }, params, context) {
      return context.dataLoaders.source.sourceLoader.load(source_id);
    },
  },
};

export { schema, resolvers };
