import React, { useState } from 'react';
import styled from 'styled-components';
import nl2br from 'lib/nl2br';
import { IconButton } from 'module/common/component/Button';
import WithUser from 'module/common/component/WithUser';
import Confirm from 'module/common/Confirm';
import SimpleDataTable, { Cell, Heading } from 'module/common/SimpleDataTable';
import SourceCitationAdd from './SourceCitationAdd';
import SourceCitationEdit from './SourceCitationEdit';
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
          <WithUser>
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
          </WithUser>

          <SimpleDataTable>
            <thead>
              <tr>
                <Heading>Source</Heading>
                <Heading>
                  <WithUser>
                    <IconButton
                      sm
                      success
                      icon="plus-circle"
                      onClick={toggleAddOpen}
                    >
                      Add
                    </IconButton>
                  </WithUser>
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
                      <CitationDetails>
                        {nl2br(citation.citation)}
                      </CitationDetails>
                    )}
                  </Cell>
                  <Cell right>
                    {citation.citation ? (
                      <ToggleCitation onClick={() => toggle(citation.id)} />
                    ) : null}{' '}
                    <WithUser>
                      <IconButton
                        xs
                        success
                        icon="pencil"
                        onClick={() => toggleEditOpen(citation)}
                      />
                      <IconButton
                        xs
                        danger
                        icon="times"
                        onClick={() => toggleDeleteOpen(citation)}
                      />
                    </WithUser>
                  </Cell>
                </tr>
              ))}
            </tbody>
          </SimpleDataTable>
        </ListContainer>
      )}
    </NotificationConsumer>
  );
};
