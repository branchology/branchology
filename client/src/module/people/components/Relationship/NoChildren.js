import React from 'react';
import pickRandom from 'lib/pickRandom';
import { IconButton } from 'module/common/component/Button';
import NoResults from '../NoResults';

const icons = ['child'];

const message = `There are currently no recorded children of this relationship. 
Do you want to add the first one?`;

export default ({ onAction }) => (
  <NoResults
    icon={pickRandom(icons)}
    message={message}
    actions={
      <IconButton success icon="plus-circle" onClick={onAction}>
        Add Child
      </IconButton>
    }
  />
);
