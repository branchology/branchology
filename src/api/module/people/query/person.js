import { findPersonById } from 'db';

export default function personQuery(root, { id }) {
  return findPersonById(id);
}
