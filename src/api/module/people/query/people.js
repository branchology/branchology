import { findAllPeople } from 'db';
import { applyPaging } from 'lib';

function applySorting(query, sorting) {
  sorting.forEach(({ field, order }) => {
    query.orderBy(field, order);
  });
}

export default function peopleQuery(root, { filter, sorting, paging }) {
  const query = findAllPeople(filter, sorting);
  // applySorting(query, sorting);
  return applyPaging(query, paging);
}
