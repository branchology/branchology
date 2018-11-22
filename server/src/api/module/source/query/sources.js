import db from 'db/conn';
import Source from 'db/Source';
import { applyPaging } from 'lib';

const source = new Source(db); // TODO: FIXME:

function applySorting(query, sorting) {
  sorting.forEach(({ field, order }) => {
    query.orderBy(field, order);
  });
}

export default function sourceQuery(root, { paging, search, sorting }) {
  const query = source.findAll(search);
  applySorting(query, sorting);
  return applyPaging(query, paging);
}
