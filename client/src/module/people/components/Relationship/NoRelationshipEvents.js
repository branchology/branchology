import React from 'react';
import pickRandom from 'lib/pickRandom';
import { components } from 'module/common';
import NoResults from '../NoResults';

const {
  ui: { IconButton },
  WithUser,
} = components;

const eventIcons = ['calendar', 'ring'];
const message = `There are currently no events for this relationship.`;

export default () => (
  <NoResults
    icon={pickRandom(eventIcons)}
    message={message}
    actions={
      <WithUser>
        <IconButton success icon="plus-circle" onClick={() => null}>
          Add Event
        </IconButton>
      </WithUser>
    }
  />
);
