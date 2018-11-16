import React from 'react';
import pickRandom from 'lib/pickRandom';
import { IconButton } from 'module/common/Buttons';
import NoResults from './NoResults';

const eventIcons = ['calendar', 'ring'];

const message = `There are currently no events for this relationship. 
Do you want to add the first one?`;

export default () => (
  <NoResults
    icon={pickRandom(eventIcons)}
    message={message}
    actions={
      <IconButton success icon="plus-circle" onClick={() => null}>
        Add Event
      </IconButton>
    }
  />
);