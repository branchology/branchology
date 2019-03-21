import React from 'react';
import pickRandom from 'lib/pickRandom';
import { components } from 'module/common';
import NoResults from '../NoResults';

const {
  ui: { IconButton },
  WithUser,
} = components;

const eventIcons = ['bible', 'birthday-cake', 'calendar'];
const message = `There are currently no events for this person.`;

export default ({ onAddClick }) => (
  <NoResults
    icon={pickRandom(eventIcons)}
    message={message}
    actions={
      <WithUser>
        <IconButton success icon="plus-circle" onClick={onAddClick}>
          Add Event
        </IconButton>
      </WithUser>
    }
  />
);
