import React, { useState } from 'react';
import styled from 'styled-components';
import nl2br from 'lib/nl2br';
import { IconButton } from 'module/common/component/Button';
import SimpleDataTable, { Cell, Heading } from 'module/common/SimpleDataTable';
import SourceCitationAdd from './SourceCitationAdd';

const ListContainer = styled.ol`
  font-size: 0.9em;
  list-style-position: inside;
  margin: 0;
  padding-left: 10px;

  li {
    line-height: 1.5em;
  }

  .toggle {
    cursor: pointer;
  }
`;

const CitationDetails = styled.blockquote`
  border-left: 3px solid #ccc;
  margin-left: 20px;
  padding-left: 16px;
`;

const ToggleCitation = ({ onClick }) => (
  <span className="toggle" onClick={onClick} title="View Details">
    <IconButton xs primary icon="search" />
  </span>
);

function useToggle(defaultValue = false) {
  const [toggled, setToggled] = useState(defaultValue);

  const toggle = () => setToggled(!toggled);

  return [toggled, toggle];
}

export default ({ citations, entity, ...props }) => {
  const [expanded, setExpanded] = useState([]);
  const [addOpen, toggleAddOpen] = useToggle();

  const toggle = id =>
    expanded.includes(id)
      ? setExpanded(expanded.filter(i => i !== id))
      : setExpanded([...expanded, id]);

  return (
    <ListContainer>
      {addOpen && (
        <SourceCitationAdd
          entity={entity}
          onClose={toggleAddOpen}
          addCitation={props.addCitation}
        />
      )}
      <SimpleDataTable>
        <thead>
          <tr>
            <Heading>Source</Heading>
            <Heading>
              <IconButton sm success icon="plus-circle" onClick={toggleAddOpen}>
                Add
              </IconButton>
            </Heading>
          </tr>
        </thead>
        <tbody>
          {citations.map(citation => (
            <tr key={citation.id}>
              <Cell>
                {citation.source.title}{' '}
                {citation.page ? `- ${citation.page}` : null}{' '}
                {expanded.includes(citation.id) && (
                  <CitationDetails>{nl2br(citation.citation)}</CitationDetails>
                )}
              </Cell>
              <Cell right>
                {citation.citation ? (
                  <ToggleCitation onClick={() => toggle(citation.id)} />
                ) : null}{' '}
                <IconButton xs success icon="pencil" />
                <IconButton xs danger icon="times" />
              </Cell>
            </tr>
          ))}
        </tbody>
      </SimpleDataTable>
    </ListContainer>
  );
};
