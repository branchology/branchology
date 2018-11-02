import db from 'db/conn';
import Person from 'db/Person';

const person = new Person(db); // TODO: FIXME:

export default function personQuery(root, { id }) {
  return person.findById(id);
}
