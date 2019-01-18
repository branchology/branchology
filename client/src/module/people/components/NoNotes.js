import React from 'react';
import pickRandom from 'lib/pickRandom';
import { components } from 'module/common';
import NoResults from './NoResults';

const {
  ui: { IconButton },
  WithUser,
} = components;

const noteIcons = ['book-open', 'sticky-note'];
const message = `There are currently no notes. Do you want to add the first one?`;

export default () => (
  <NoResults
    icon={pickRandom(noteIcons)}
    message={message}
    actions={
      <WithUser>
        <IconButton success icon="plus-circle" onClick={() => null}>
          Add Note
        </IconButton>
      </WithUser>
    }
  />
);
