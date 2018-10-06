import DataLoader from 'dataloader';
import { findNoteByIds } from 'db';
import { organizeResultsById } from 'lib';

export default new DataLoader(ids =>
  findNoteByIds(ids).then(notes => organizeResultsById(notes, ids)),
);
