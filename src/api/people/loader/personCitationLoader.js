import DataLoader from 'dataloader';
import { findPersonCitationsByPersonIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findPersonCitationsByPersonIds(ids).then(citations =>
    organizeMultipleResultsById(citations, ids, 'person_id'),
  ),
);
