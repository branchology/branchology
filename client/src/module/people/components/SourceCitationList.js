import React from 'react';
import nl2br from 'lib/nl2br';

export default ({ citations }) => (
  <ul>
    {citations.map(citation => (
      <li key={citation.id}>
        {citation.source.title} - {citation.page}
        <blockquote>{nl2br(citation.citation)}</blockquote>
      </li>
    ))}
  </ul>
);
