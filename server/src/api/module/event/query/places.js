import { applyPaging, applySorting } from 'lib';

export default function placesQuery(
  root,
  { paging, search, sorting },
  context,
) {
  const query = context.dbal.place.findAll(search);
  applySorting(query, sorting);
  return applyPaging(query, paging);
}
