import React from 'react';
import { useToggle } from 'lib';
import DataContainer from 'module/common/DataContainer';
import { IconButton } from 'module/common/component/Button';
import WithUser from 'module/common/component/WithUser';
import AddRelationship from './AddRelationship';
import NoRelationships from './NoRelationships';
import RelationshipList from './RelationshipList';

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
