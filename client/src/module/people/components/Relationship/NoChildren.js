import React from 'react';
import pickRandom from 'lib/pickRandom';
import { components } from 'module/common';
import NoResults from '../NoResults';

const {
  ui: { IconButton },
  WithUser,
} = components;

const icons = ['child'];
const message = `There are currently no recorded children of this relationship.`;

export default ({ onAction }) => (
  <NoResults
    icon={pickRandom(icons)}
    message={message}
    actions={
      <WithUser>
        <IconButton success icon="plus-circle" onClick={onAction}>
          Add Child
        </IconButton>
      </WithUser>
    }
  />
);
