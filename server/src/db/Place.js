import { generateUuid, returnFirst } from '../lib';

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
        {
          id: placeId,
          postal_code: postalCode,
          state_province: stateProvince,
          ...otherPlaceData,
        },
        '*',
      )
      .then(returnFirst);
  }
}
