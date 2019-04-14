import React from 'react';
import pickRandom from 'lib/pickRandom';
import { components } from 'module/common';
import NoResults from '../NoResults';

const {
  ui: { IconButton },
  WithUser,
} = components;

const eventIcons = ['bible', 'birthday-cake', 'calendar'];

export default ({ onAddClick, type }) => (
  <NoResults
    icon={pickRandom(eventIcons)}
    message={`There are currently no events for this ${type}.`}
    actions={
      <WithUser>
        <IconButton success icon="plus-circle" onClick={onAddClick}>
          Add Event
        </IconButton>
      </WithUser>
    }
  />
);
