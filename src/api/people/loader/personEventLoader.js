import DataLoader from 'dataloader';
import { findPersonEventsByPersonIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findPersonEventsByPersonIds(ids).then(events =>
    organizeMultipleResultsById(events, ids, 'person_id'),
  ),
);
