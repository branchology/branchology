import DataLoader from 'dataloader';
import { findPersonNotesByPersonIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findPersonNotesByPersonIds(ids).then(notes =>
    organizeMultipleResultsById(notes, ids, 'person_id'),
  ),
);
