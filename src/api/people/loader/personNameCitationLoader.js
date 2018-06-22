import DataLoader from 'dataloader';
import { findPersonNameCitationsByPersonIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findPersonNameCitationsByPersonIds(ids).then(citations =>
    organizeMultipleResultsById(citations, ids, 'person_name_id'),
  ),
);
