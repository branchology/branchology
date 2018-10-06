import DataLoader from 'dataloader';
import { findPersonNameNotesByPersonNameIds } from 'db';
import { organizeMultipleResultsById } from 'lib';

export default new DataLoader(ids =>
  findPersonNameNotesByPersonNameIds(ids).then(notes =>
    organizeMultipleResultsById(notes, ids, 'person_name_id'),
  ),
);
