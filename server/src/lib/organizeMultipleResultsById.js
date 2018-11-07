export default function organizeMultipleResultsById(
  results,
  ids,
  idColumn = 'id',
) {
  const organizedResults = [];
  ids.forEach(id => {
    const idCollection = results.filter(result => result[idColumn] === id);
    organizedResults.push(idCollection);
  });

  return organizedResults;
}
