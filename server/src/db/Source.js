import { returnFirst } from 'lib';
import db from './conn';
import {
  SOURCE_CITATION_TABLE,
  SOURCE_TABLE,
  SOURCE_NOTE_TABLE,
} from './constants';
import { dbToGraphQL, generateUuid, graphQLToDb } from './lib';

export default class Source {
  constructor(db) {
    this.db = db;
  }

  findSourceByIds(ids) {
    return db(SOURCE_TABLE)
      .select('*')
      .whereIn('id', ids)
      .then(dbToGraphQL);
  }

  findAll(search) {
    return this.db
      .select(['*'])
      .from(SOURCE_TABLE)
      .where('title', '~', search)
      .then(dbToGraphQL);
  }

  createSource(data) {
    const { title } = data;

    const sourceId = data.id || generateUuid();

    return db(SOURCE_TABLE)
      .insert({ id: sourceId, title }, '*')
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  createSourceCitation(sourceId, data) {
    const { citation, page } = data;

    const citationId = generateUuid();

    return db(SOURCE_CITATION_TABLE)
      .insert(graphQLToDb({ id: citationId, sourceId, citation, page }), '*')
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  updateSourceCitation(id, data) {
    return db(SOURCE_CITATION_TABLE)
      .update({ ...data }, '*')
      .where('id', id)
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  deleteCitation(id) {
    return db(SOURCE_CITATION_TABLE)
      .delete()
      .where('id', id)
      .then(() => true)
      .then(dbToGraphQL);
  }

  attachNote(sourceId, noteId) {
    const id = generateUuid();

    return this.db(SOURCE_NOTE_TABLE)
      .insert(graphQLToDb({ id, sourceId, noteId }), '*')
      .then(returnFirst)
      .then(dbToGraphQL);
  }

  attachSourceCitation(method, relatedId, citations) {
    return Promise.all(
      citations.map(async ({ source, sourceId, ...citation }) => {
        let mySourceId = sourceId;

        if (source) {
          const source = await this.create({
            title: source,
          });
          mySourceId = source.id;
        }

        return method(relatedId, mySourceId, citation);
      }),
    );
  }
}
