import db from 'db/conn';
import Person from 'db/Person';

// TODO: FIXME:
const person = new Person(db);

export default function removePersonAttributeMutation(root, { attributeId }) {
  return person
    .removeAttribute(attributeId)
    .then(({ person_id }) => ({ removed: true, personId: person_id }));
}
