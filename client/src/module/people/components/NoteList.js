import React from 'react';
import NoResults from 'component/NoResults';
import nl2br from 'lib/nl2br';

export default ({ notes }) => (
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
