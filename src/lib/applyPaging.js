export default function applyPaging(query, paging) {
  // TODO: paging
  return query.then(data => {
    return { items: data };
  });
}
