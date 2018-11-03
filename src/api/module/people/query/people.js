import db from 'db/conn';
import Person from 'db/Person';
import { applyPaging } from 'lib';

const person = new Person(db); // TODO: FIXME:

function applySorting(query, sorting) {
  sorting.forEach(({ field, order }) => {
    query.orderBy(field, order);
  });
}

export default function peopleQuery(root, { filter, sorting, paging }) {
  const query = person.findAll(filter, sorting);
  // applySorting(query, sorting);
  return applyPaging(query, paging);
}
