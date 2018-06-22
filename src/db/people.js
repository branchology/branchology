import db from './conn';
import { generateUuid, returnFirst } from '../lib';
import { createEvent } from './event';

export const PEOPLE_TABLE = 'people';
export const PERSON_EVENT_TABLE = 'person_events';
export const PERSON_NAME_TABLE = 'person_names';

export function findAllPeople(filter, sorting) {
  // TODO: Sorting + filtering
  return db.select(['*']).from(PEOPLE_TABLE);
}

export function findPersonNamesByPersonIds(ids) {
  return db
    .select(['*'])
    .from(PERSON_NAME_TABLE)
    .whereIn('person_id', ids);
}

export function createPersonName(personId, nameData) {
  const nameId = generateUuid();

  return db(PERSON_NAME_TABLE)
    .insert(
      {
        id: nameId,
        person_id: personId,
        ...nameData,
      },
      '*',
    )
    .then(returnFirst);
}

export async function createPerson(data) {
  const {
    sex,
    given,
    surname,
    birthDate,
    birthPlace,
    birthPlaceId,
    deathDate,
    deathPlace,
    deathPlaceId,
  } = data;

  const personId = generateUuid();

  // create a person...
  const person = await db(PEOPLE_TABLE)
    .insert({ id: personId, sex, slug: `${given}-${surname}` }, '*')
    .then(returnFirst);

  const bagOfPromises = [];

  if (given || surname) {
    const nameId = generateUuid();
    bagOfPromises.push(createPersonName(personId, { given, surname }));
  }

  if (birthDate || birthPlace || birthPlaceId) {
    const birth = await createEvent('birt', {
      date: birthDate,
      place: birthPlace,
      placeId: birthPlaceId,
    });
    await attachPersonEvent(personId, birth.id);
  }

  if (deathDate || deathPlace || deathPlaceId) {
    const death = await createEvent('deat', {
      date: deathDate,
      place: deathPlace,
      placeId: deathPlaceId,
    });
    await attachPersonEvent(personId, death.id);
  }

  return Promise.all(bagOfPromises).then(() => person);
}

export function attachPersonEvent(personId, eventId) {
  const id = generateUuid();

  return db(PERSON_EVENT_TABLE)
    .insert({ id, person_id: personId, event_id: eventId }, '*')
    .then(returnFirst);
}
