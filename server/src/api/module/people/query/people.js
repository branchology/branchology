import { applyPaging } from 'lib';

function applySorting(query, sorting) {
  sorting.forEach(({ field, order }) => {
    query.orderBy(field, order);
  });
}

export default function peopleQuery(
  root,
  { filter, sorting, paging },
  context,
) {
  const query = context.dbal.person.findAll(filter, sorting);
  // applySorting(query, sorting);
  return applyPaging(query, paging);
}
