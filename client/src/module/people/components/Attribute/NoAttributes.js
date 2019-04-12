import React from 'react';
import pickRandom from 'lib/pickRandom';
import { components } from 'module/common';
import NoResults from '../NoResults';

const {
  ui: { IconButton },
  WithUser,
} = components;

const attributeIcons = [
  'user-astronaut',
  'user-graduate',
  'user-md',
  'user-ninja',
];

const message = `There are currently no attributes for this person.`;

export default ({ onAddClick }) => (
  <NoResults
    icon={pickRandom(attributeIcons)}
    message={message}
    actions={
      <WithUser>
        <IconButton success icon="plus-circle" onClick={onAddClick}>
          Add Attribute
        </IconButton>
      </WithUser>
    }
  />
);
