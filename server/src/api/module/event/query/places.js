import db from 'db/conn';
import Place from 'db/Place';
import { applyPaging } from 'lib';

const place = new Place(db); // TODO: FIXME:

function applySorting(query, sorting) {
  sorting.forEach(({ field, order }) => {
    query.orderBy(field, order);
  });
}

export default function placesQueyr(root, { paging, search, sorting }) {
  const query = place.findAll(search);
  applySorting(query, sorting);
  return applyPaging(query, paging);
}
