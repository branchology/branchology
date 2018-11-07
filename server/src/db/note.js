import db from './conn';
import { generateUuid, returnFirst } from '../lib';

export const NOTE_TABLE = 'notes';

export async function createNote(data) {
  const { text } = data;

  const id = generateUuid();

  return db(NOTE_TABLE)
    .insert({ id, text }, '*')
    .then(returnFirst);
}
