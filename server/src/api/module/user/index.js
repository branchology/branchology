import schema from './schema';
import Mutation from './mutation';

const resolvers = {
  Mutation,
  Token: {
    user({ user_id: userId }, params, context) {
      return context.dataLoaders.user.findUserById.load(userId);
    },
  },
};

export { schema, resolvers };
