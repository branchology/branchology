import DataLoader from 'dataloader';
import { findPersonEventCitationsByPersonIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findPersonEventCitationsByPersonIds(ids).then(citations =>
    organizeMultipleResultsById(citations, ids, 'person_event_id'),
  ),
);
