import db from './conn';
import {
  EVENT_TABLE,
  PARENTS_TABLE,
  PEOPLE_TABLE,
  PERSON_RELATIONSHIPS_TABLE,
  RELATIONSHIP_TABLE,
  RELATIONSHIP_EVENT_TABLE,
  RELATIONSHIP_NOTE_TABLE,
} from './constants';
import Event from './Event';
import Person from './Person';
import { generateUuid, returnFirst } from '../lib';

export function findRelationshipsByIds(ids) {
  return db(RELATIONSHIP_TABLE)
    .select('*')
    .whereIn('id', ids);
}

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

export function findPersonParentsByIds(ids) {
  return db(PARENTS_TABLE)
    .select('*')
    .whereIn('person_id', ids);
}

export function findChildrenByRelationshipIds(ids) {
  return db(PARENTS_TABLE)
    .select('*')
    .whereIn('relationship_id', ids);
}

export default class Relationship {
  constructor(db) {
    this.db = db;
    this.event = new Event(db);
    this.person = new Person(db);
  }

  async create(spouse1, spouse2) {
    const relationshipId = generateUuid();

    const relationship = await this.db(RELATIONSHIP_TABLE)
      .insert({ id: relationshipId }, '*')
      .then(returnFirst);

    if (spouse1) {
      await this.person.attachRelationship(spouse1, relationshipId);
    }

    if (spouse2) {
      await this.person.attachRelationship(spouse2, relationshipId);
    }

    return relationship;
  }

  attachEvent(relationshipId, eventId) {
    const id = generateUuid();

    return this.db(RELATIONSHIP_EVENT_TABLE)
      .insert({ id, relationship_id: relationshipId, event_id: eventId }, '*')
      .then(returnFirst);
  }

  removeEvent(eventId) {
    return this.db(RELATIONSHIP_EVENT_TABLE)
      .delete()
      .where('event_id', eventId)
      .returning('*')
      .then(returnFirst)
      .then(relationshipEvent => {
        return this.db(EVENT_TABLE)
          .delete()
          .where('id', eventId)
          .then(() => relationshipEvent);
      });
  }

  attachChild(relationshipId, personId, type = 'BIRTH') {
    return this.db(PARENTS_TABLE)
      .insert(
        {
          id: generateUuid(),
          relationship_id: relationshipId,
          person_id: personId,
          type,
        },
        '*',
      )
      .then(returnFirst);
  }

  attachNote(relationshipId, noteId) {
    const id = generateUuid();

    return this.db(RELATIONSHIP_NOTE_TABLE)
      .insert({ id, relationship_id: relationshipId, note_id: noteId }, '*')
      .then(returnFirst);
  }
}
