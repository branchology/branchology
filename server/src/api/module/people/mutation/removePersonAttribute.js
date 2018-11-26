import db from 'db/conn';
import Person from 'db/Person';

// TODO: FIXME:
const person = new Person(db);

export default function removePersonAttributeMutation(root, { attributeId }) {
  return person.removeAttribute(attributeId).then(() => ({ removed: true }));
}
