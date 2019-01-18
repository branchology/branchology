import React from 'react';
import pickRandom from 'lib/pickRandom';
import { components } from 'module/common';
import NoResults from '../NoResults';

const {
  ui: { IconButton },
  WithUser,
} = components;

const icons = ['ring'];

const message = `There are currently no relationships for this person.`;

export default () => (
  <NoResults
    icon={pickRandom(icons)}
    message={message}
    actions={
      <WithUser>
        <IconButton success icon="plus-circle" onClick={() => null}>
          Add Relationship
        </IconButton>
      </WithUser>
    }
  />
);
