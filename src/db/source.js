import db from './conn';
import { SOURCE_CITATION_TABLE, SOURCE_TABLE } from './constants';
import { generateUuid, returnFirst } from '../lib';

export function findSourceByIds(ids) {
  return db(SOURCE_TABLE)
    .select('*')
    .whereIn('id', ids);
}

export function createSource(data) {
  const { title } = data;

  const sourceId = data.id || generateUuid();

  return db(SOURCE_TABLE)
    .insert({ id: sourceId, title }, '*')
    .then(returnFirst);
}

export function createSourceCitation(sourceId, data) {
  const { citation, page } = data;

  const citationId = generateUuid();

  return db(SOURCE_CITATION_TABLE)
    .insert({ id: citationId, source_id: sourceId, citation, page }, '*')
    .then(returnFirst);
}
