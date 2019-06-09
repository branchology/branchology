import db from 'db/conn';
import Person from 'db/Person';

// TODO: FIXME:
const person = new Person(db);

export default function makePersonNamePreferred(root, { personNameId }) {
  return person
    .setPersonNamePreferred(personNameId)
    .then(name => person.findById(name.personId).then(person => ({ person })));
}
