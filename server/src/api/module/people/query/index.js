import requireDir from 'require-dir';
const queries = requireDir('./');

const deDefaulted = {};

Object.keys(queries).forEach(queryName => {
  deDefaulted[queryName] = queries[queryName].default;
});

module.exports = { ...deDefaulted };
