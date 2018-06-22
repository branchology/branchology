import db from './conn';
import { generateUuid, returnFirst } from '../lib';

export const SOURCE_TABLE = 'sources';

export function findSourceByIds(ids) {
  return db(SOURCE_TABLE)
    .select('*')
    .whereIn('id', ids);
}

export async function createSource(data) {
  const { title } = data;

  const sourceId = generateUuid();

  return db(SOURCE_TABLE)
    .insert({ id: sourceId, title }, '*')
    .then(returnFirst);
}
