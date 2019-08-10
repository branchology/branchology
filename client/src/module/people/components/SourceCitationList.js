import { Button, ButtonGroup, HTMLTable } from '@blueprintjs/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import nl2br from 'lib/nl2br';
import { Confirm } from 'module/common/component/ui';
import SourceCitationAdd from './Citation/Add';
import SourceCitationEdit from './Citation/Edit';
import { NotificationConsumer } from '../../common/notifications';

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
    <Button small intent="primary" minimal icon="search" />
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
  const [selectedForEdit, toggleEditOpen] = useState(null);
  const [deleteOpen, toggleDeleteOpen] = useState(null);

  const toggle = id =>
    expanded.includes(id)
      ? setExpanded(expanded.filter(i => i !== id))
      : setExpanded([...expanded, id]);

  return (
    <NotificationConsumer>
      {({ notify }) => (
        <ListContainer>
          {addOpen && (
            <SourceCitationAdd
              entity={entity}
              onClose={toggleAddOpen}
              addCitation={props.addCitation}
            />
          )}

          {selectedForEdit && (
            <SourceCitationEdit
              entity={entity}
              citation={selectedForEdit}
              onClose={() => toggleEditOpen(null)}
              updateCitation={props.updateCitation}
            />
          )}

          {deleteOpen && (
            <Confirm
              title="Warning"
              icon="exclamation-triangle"
              message={`Are you sure you want to permanently remove this citation for "${
                deleteOpen.source.title
              }"?`}
              onConfirm={() =>
                props
                  .removeCitation({
                    variables: {
                      entityId: entity.id,
                      citationId: deleteOpen.id,
                    },
                  })
                  .then(({ data: { removeCitation: { errors } } }) => {
                    if (errors) {
                      // TODO: FIXME: Let the user know...
                      return false;
                    }

                    notify('Citation Removed Successfully.');

                    toggleDeleteOpen(null);
                  })
              }
              onCancel={() => toggleDeleteOpen(null)}
            />
          )}

          <HTMLTable interactive striped style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Source</th>
                <th className="right">
                  <Button
                    small
                    minimal
                    intent="success"
                    icon="add"
                    onClick={toggleAddOpen}
                  >
                    Add Citation
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {citations.map(citation => (
                <tr key={citation.id}>
                  <td>
                    {citation.source.title}{' '}
                    {citation.page ? `- ${citation.page}` : null}{' '}
                    {expanded.includes(citation.id) && (
                      <CitationDetails>
                        {nl2br(citation.citation)}
                      </CitationDetails>
                    )}
                  </td>
                  <td className="right">
                    <ButtonGroup minimal={true}>
                      {citation.citation ? (
                        <ToggleCitation onClick={() => toggle(citation.id)} />
                      ) : null}

                      <Button
                        small
                        intent="success"
                        icon="edit"
                        minimal
                        onClick={() => toggleEditOpen(citation)}
                      />
                      <Button
                        small
                        intent="danger"
                        icon="cross"
                        minimal
                        onClick={() => toggleDeleteOpen(citation)}
                      />
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        </ListContainer>
      )}
    </NotificationConsumer>
  );
};
