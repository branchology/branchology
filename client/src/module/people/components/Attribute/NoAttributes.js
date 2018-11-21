import React from 'react';
import pickRandom from 'lib/pickRandom';
import { IconButton } from 'module/common/component/Button';
import NoResults from '../NoResults';

const attributeIcons = [
  'user-astronaut',
  'user-graduate',
  'user-md',
  'user-ninja',
];

const message = `There are currently no attributes for this person. 
Do you want to add the first one?`;

export default () => (
  <NoResults
    icon={pickRandom(attributeIcons)}
    message={message}
    actions={
      <IconButton success icon="plus-circle" onClick={() => null}>
        Add Attribute
      </IconButton>
    }
  />
);
