import DataLoader from 'dataloader';
import { findEventNotesByEventIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findEventNotesByEventIds(ids).then(notes =>
    organizeMultipleResultsById(notes, ids, 'event_id'),
  ),
);
