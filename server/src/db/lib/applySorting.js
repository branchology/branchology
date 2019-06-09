export function applySorting(query, sorting = []) {
  sorting.forEach(({ field, order }) => {
    query.orderBy(field, order);
  });

  return query;
}
