import requireDir from 'require-dir';
import baseSchema from './schema';

const modules = requireDir('./module', { recurse: true });

const typeDefs = [baseSchema];

const resolvers = {
  Mutation: {},
  Query: {},
};

Object.keys(modules).map(moduleName => {
  const {
    schema,
    resolvers: { Mutation, Query, ...moduleResolvers },
  } = modules[moduleName].index;

  if (schema) {
    typeDefs.push(schema);
  }

  if (Mutation) {
    Object.keys(Mutation).map(mutationName => {
      resolvers.Mutation[mutationName] = Mutation[mutationName];
    });
  }

  if (Query) {
    Object.keys(Query).map(queryName => {
      resolvers.Query[queryName] = Query[queryName];
    });
  }

  if (moduleResolvers) {
    Object.keys(moduleResolvers).map(resolverName => {
      resolvers[resolverName] = moduleResolvers[resolverName];
    });
  }
});

export { typeDefs, resolvers };
