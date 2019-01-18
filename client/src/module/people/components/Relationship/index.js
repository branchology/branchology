import React from 'react';
import { useToggle } from 'lib';
import { components } from 'module/common';
import AddRelationship from './AddRelationship';
import NoRelationships from './NoRelationships';
import RelationshipList from './RelationshipList';

const {
  ui: { DataContainer, IconButton },
  WithUser,
} = components;

export default ({ person }) => {
  const [addOpen, toggleAdd] = useToggle();

  return (
    <DataContainer>
      <WithUser>
        {addOpen && <AddRelationship person={person} onClose={toggleAdd} />}
      </WithUser>

      <div className="header">
        <h3 className="sectionTitle">Relationships</h3>
        <WithUser>
          <IconButton icon="plus-circle" success sm onClick={toggleAdd}>
            Add Relationship
          </IconButton>
        </WithUser>
      </div>
      {person.relationships.length ? (
        <RelationshipList
          person={person}
          relationships={person.relationships}
        />
      ) : (
        <NoRelationships />
      )}
    </DataContainer>
  );
};
