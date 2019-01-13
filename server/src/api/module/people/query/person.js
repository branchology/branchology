import { dbToGraphQL } from 'lib';

export default function personQuery(root, { id }, context) {
  return context.dbal.person.findById(id).then(dbToGraphQL);
}
