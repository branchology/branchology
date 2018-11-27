export default function personQuery(root, { id }, context) {
  return context.dbal.person.findById(id);
}
