import React, { useState } from 'react';
import styled from 'styled-components';
import nl2br from 'lib/nl2br';

const ListContainer = styled.ol`
  font-size: 0.9em;
  list-style-position: inside;
  margin: 0;
  padding-left: 10px;
`;

const ToggleCitation = ({ onClick }) => (
  <span onClick={onClick}>
    [<a href="#view">view citation</a>]
  </span>
);

export default ({ citations }) => {
  const [expanded, setExpanded] = useState([]);

  const toggle = id =>
    expanded.includes(id)
      ? setExpanded(expanded.filter(i => i !== id))
      : setExpanded([...expanded, id]);

  return (
    <ListContainer>
      {citations.map(citation => (
        <li key={citation.id}>
          {citation.source.title} {citation.page ? `- ${citation.page}` : null}{' '}
          {citation.citation ? (
            <ToggleCitation onClick={() => toggle(citation.id)} />
          ) : null}
          {expanded.includes(citation.id) && (
            <blockquote>{nl2br(citation.citation)}</blockquote>
          )}
        </li>
      ))}
    </ListContainer>
  );
};
