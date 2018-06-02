import db from './conn';

export const PEOPLE_TABLE_NAME = 'people';

export function fetchPeople(filters, sorting) {
  const query = db.select(['*']).from(PEOPLE_TABLE_NAME);

  return query;
}
