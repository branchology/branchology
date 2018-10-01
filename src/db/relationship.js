import db from './conn';
import {
  EVENT_TABLE,
  PEOPLE_TABLE,
  PERSON_RELATIONSHIPS_TABLE,
  RELATIONSHIP_TABLE,
  RELATIONSHIP_EVENT_TABLE,
} from './constants';
import { createEvent } from './event';
import { attachPersonRelationship } from './people';
import { generateUuid, returnFirst } from '../lib';

export function findRelationshipPersons(ids) {
  return db
    .select(['p.*', 'pr.relationship_id'])
    .from(`${PERSON_RELATIONSHIPS_TABLE} as pr`)
    .join(`${PEOPLE_TABLE} as p`, 'p.id', 'pr.person_id')
    .whereIn('relationship_id', ids);
}

export function findRelationshipEventsByRelationshipIds(ids) {
  return db
    .select(['e.*', 're.id AS relationship_event_id', 're.relationship_id'])
    .from(`${RELATIONSHIP_EVENT_TABLE} as re`)
    .join(`${EVENT_TABLE} as e`, 'e.id', 're.event_id')
    .whereIn('relationship_id', ids);
}

export function findRelationshipPrimaryEventsByRelationshipIdAndType(pairs) {
  return db
    .select(['e.*', 're.id AS relationship_event_id', 're.relationship_id'])
    .from(`${RELATIONSHIP_EVENT_TABLE} as re`)
    .join(`${EVENT_TABLE} as e`, 'e.id', 're.event_id')
    .whereIn(db.raw('(relationship_id, LOWER(e.type))'), pairs);
}

export async function createRelationship(spouse1, spouse2, data) {
  const { marriageDate, marriagePlace, marriagePlaceId } = data;

  const relationshipId = generateUuid();

  const relationship = await db(RELATIONSHIP_TABLE)
    .insert({ id: relationshipId }, '*')
    .then(returnFirst);

  if (marriageDate || marriagePlace || marriagePlaceId) {
    const marriage = await createEvent('marr', {
      date: marriageDate,
      place: marriagePlace,
      placeId: marriagePlaceId,
    });
    await attachRelationshipEvent(relationshipId, marriage.id);
  }

  if (spouse1) {
    await attachPersonRelationship(spouse1, relationshipId);
  }

  if (spouse2) {
    await attachPersonRelationship(spouse2, relationshipId);
  }

  return relationship;
}

export function attachRelationshipEvent(relationshipId, eventId) {
  const id = generateUuid();

  return db(RELATIONSHIP_EVENT_TABLE)
    .insert({ id, relationship_id: relationshipId, event_id: eventId }, '*')
    .then(returnFirst);
}
