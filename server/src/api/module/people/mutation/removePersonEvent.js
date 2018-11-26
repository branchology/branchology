import db from 'db/conn';
import Person from 'db/Person';

// TODO: FIXME:
const person = new Person(db);

export default function removePersonEventMutation(root, { eventId }) {
  return person.removeEvent(eventId).then(() => ({ removed: true }));
}
