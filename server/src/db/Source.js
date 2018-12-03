import db from './conn';
import { SOURCE_CITATION_TABLE, SOURCE_TABLE } from './constants';
import { generateUuid, returnFirst } from '../lib';

export default class Source {
  constructor(db) {
    this.db = db;
  }

  findSourceByIds(ids) {
    return db(SOURCE_TABLE)
      .select('*')
      .whereIn('id', ids);
  }

  findAll(search) {
    return this.db
      .select(['*'])
      .from(SOURCE_TABLE)
      .where('title', '~', search);
  }

  createSource(data) {
    const { title } = data;

    const sourceId = data.id || generateUuid();

    return db(SOURCE_TABLE)
      .insert({ id: sourceId, title }, '*')
      .then(returnFirst);
  }

  createSourceCitation(sourceId, data) {
    const { citation, page } = data;

    const citationId = generateUuid();

    return db(SOURCE_CITATION_TABLE)
      .insert({ id: citationId, source_id: sourceId, citation, page }, '*')
      .then(returnFirst);
  }

  updateSourceCitation(id, data) {
    return db(SOURCE_CITATION_TABLE)
      .update({ ...data }, '*')
      .where('id', id)
      .then(returnFirst);
  }

  deleteCitation(id) {
    return db(SOURCE_CITATION_TABLE)
      .delete()
      .where('id', id)
      .then(() => true);
  }
}
