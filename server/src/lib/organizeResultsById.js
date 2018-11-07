export default function organizeResultsById(results, ids, idColumn = 'id') {
  return ids.map(id => {
    const record = results.find(result => result[idColumn] === id);
    return record || [];
  });
}
