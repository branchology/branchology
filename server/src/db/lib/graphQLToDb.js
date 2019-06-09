import { snakeCase, isObjectLike } from 'lodash';

export function graphQLToDb(input) {
  if (!isObjectLike(input)) {
    return snakeCase(input);
  }

  if (Array.isArray(input)) {
    return input.map(row => graphQLToDb(row));
  }

  const data = {};

  Object.entries(input).forEach(([key, value]) => {
    data[snakeCase(key)] = value;
  });

  return data;
}
