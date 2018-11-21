import React from 'react';
import pickRandom from 'lib/pickRandom';
import { IconButton } from 'module/common/component/Button';
import NoResults from './NoResults';

const icons = ['ring'];

const message = `There are currently no relationships for this person. 
Do you want to add the first one?`;

export default () => (
  <NoResults
    icon={pickRandom(icons)}
    message={message}
    actions={
      <IconButton success icon="plus-circle" onClick={() => null}>
        Add Relationship
      </IconButton>
    }
  />
);
