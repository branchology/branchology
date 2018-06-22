import DataLoader from 'dataloader';
import { findPersonEventNotesByPersonEventIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findPersonEventNotesByPersonEventIds(ids).then(notes =>
    organizeMultipleResultsById(notes, ids, 'person_event_id'),
  ),
);
