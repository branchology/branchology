import db from './conn';
import { generateUuid, returnFirst } from '../lib';

export const PLACE_TABLE = 'places';

export function findPlaceByIds(ids) {
  return db(PLACE_TABLE)
    .select('*')
    .whereIn('id', ids);
}

export async function createPlace(data) {
  const { postalCode, stateProvince, ...otherPlaceData } = data;

  const placeId = generateUuid();

  return db(PLACE_TABLE)
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
