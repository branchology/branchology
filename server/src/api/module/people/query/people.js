export default function peopleQuery(
  root,
  { filter, sorting, paging },
  context,
) {
  return context.dbal.person.findAll(filter, sorting, paging);
}
