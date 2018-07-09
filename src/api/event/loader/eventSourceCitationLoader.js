import DataLoader from 'dataloader';
import { findEventCitationsByEventIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findEventCitationsByEventIds(ids).then(citations =>
    organizeMultipleResultsById(citations, ids, 'event_id'),
  ),
);
