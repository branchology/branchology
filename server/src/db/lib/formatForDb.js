import { snakeCase, isObjectLike } from 'lodash';

export default function formatForDb(input) {
  if (!isObjectLike(input)) {
    return snakeCase(input);
  }

  const data = {};

  Object.entries(input).forEach(([key, value]) => {
    data[snakeCase(key)] = value;
  });

  return data;
}
