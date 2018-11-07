import DataLoader from 'dataloader';
import { findNoteByIds } from 'db';
import { organizeResultsById } from 'lib';

export default class NoteLoader {
  constructor(db) {
    this.noteLoader = new DataLoader(ids =>
      findNoteByIds(ids).then(notes => organizeResultsById(notes, ids)),
    );
  }
}
