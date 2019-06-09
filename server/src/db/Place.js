import { returnFirst } from '../lib';
import { dbToGraphQL, generateUuid, graphQLToDb } from './lib';

export default class Place {
  constructor(db) {
    this.db = db;
  }

  findByIds(ids) {
    return this.db('places')
      .select('*')
      .whereIn('id', ids)
      .then(dbToGraphQL);
  }

  findAll(search) {
    return this.db
      .select(['*'])
      .from('places')
      .where('description', '~*', search)
      .then(dbToGraphQL);
  }

  async create(data) {
    const { postalCode, stateProvince, ...otherPlaceData } = data;

    const placeId = generateUuid();

    return this.db('places')
      .insert(
        graphQLToDb({
          id: placeId,
          postalCode,
          stateProvince,
          ...otherPlaceData,
        }),
        '*',
      )
      .then(returnFirst)
      .then(dbToGraphQL);
  }
}
