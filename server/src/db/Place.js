import { returnFirst } from '../lib';
import { generateUuid, graphQLToDb } from './lib';

export default class Place {
  constructor(db) {
    this.db = db;
  }

  findByIds(ids) {
    return this.db('places')
      .select('*')
      .whereIn('id', ids);
  }

  findAll(search) {
    return this.db
      .select(['*'])
      .from('places')
      .where('description', '~*', search);
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
      .then(returnFirst);
  }
}
