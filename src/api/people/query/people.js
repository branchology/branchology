import { findAllPeople } from 'db';
import { applyPaging } from 'lib';

export default function peopleQuery(root, { filter, sorting, paging }) {
  return applyPaging(findAllPeople(filter, sorting), paging);
}
