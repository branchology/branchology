import React from 'react';
import { useToggle } from 'lib';
import DataContainer from 'module/common/DataContainer';
import { IconButton } from 'module/common/component/Button';
import AddRelationship from './AddRelationship';
import NoRelationships from './NoRelationships';
import RelationshipList from './RelationshipList';

export default ({ person }) => {
  const [addOpen, toggleAdd] = useToggle();

  return (
    <DataContainer>
      {addOpen && <AddRelationship person={person} onClose={toggleAdd} />}

      <div className="header">
        <h3 className="sectionTitle">Relationships</h3>
        <IconButton icon="plus-circle" success sm onClick={toggleAdd}>
          Add Relationship
        </IconButton>
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
