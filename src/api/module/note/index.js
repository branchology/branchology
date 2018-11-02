import schema from './schema';

const resolvers = {
  Note: {
    note({ text }) {
      return text;
    },
  },
};

export { schema, resolvers };
