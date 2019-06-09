import { camelCase, isObjectLike } from 'lodash';

export function dbToGraphQL(input) {
  if (!isObjectLike(input)) {
    return camelCase(input);
  }

  if (Array.isArray(input)) {
    return input.map(dbToGraphQL);
  }

  const data = {};

  Object.entries(input).forEach(([key, value]) => {
    data[camelCase(key)] = value;
  });

  return data;
}
