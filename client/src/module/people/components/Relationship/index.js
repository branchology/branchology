import React from 'react';
import DataContainer from 'module/common/DataContainer';
import { IconButton } from 'module/common/component/Button';
import NoRelationships from './NoRelationships';
import RelationshipList from './RelationshipList';

export default ({ person }) => (
  <DataContainer>
    <div className="header">
      <h3 className="sectionTitle">Relationships</h3>
      <IconButton icon="plus-circle" success sm>
        Add Relationship
      </IconButton>
    </div>
    {person.relationships.length ? (
      <RelationshipList person={person} relationships={person.relationships} />
    ) : (
      <NoRelationships />
    )}
  </DataContainer>
);
