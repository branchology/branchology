import requireDir from 'require-dir';
const mutations = requireDir('./');

const deDefaulted = {};

Object.keys(mutations).forEach(mutationName => {
  deDefaulted[mutationName] = mutations[mutationName].default;
});

module.exports = { ...deDefaulted };
