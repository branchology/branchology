import React from 'react';
import NoResults from 'component/NoResults';
import nl2br from 'lib/nl2br';
import NoNotes from './NoNotes';

export default ({ notes }) =>
  notes.length === 0 ? (
    <NoNotes />
  ) : (
    <div>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <blockquote>{nl2br(note.note)}</blockquote>
          </li>
        ))}
      </ul>
      {notes.length === 0 && <NoResults />}
    </div>
  );
