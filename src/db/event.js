import db from './conn';
import { generateUuid, returnFirst } from '../lib';

export const EVENT_TABLE = 'events';

export async function createEvent(type, data) {
  const { date, place, placeId, isPreferred = true } = data;

  let dbPlaceId;
  if (place || placeId) {
    dbPlaceId = placeId;
    if (place) {
      const newPlace = await createPlace({ description: birthPlace });
      dbPlaceId = newPlace.id;
    }
  }

  const { postalCode, stateProvince, ...otherPlaceData } = data;

  const eventId = generateUuid();

  return db(EVENT_TABLE)
    .insert(
      {
        id: eventId,
        type,
        date,
        place_id: dbPlaceId,
        is_preferred: isPreferred,
      },
      '*',
    )
    .then(returnFirst);
}
