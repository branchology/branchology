import React from 'react';
import pickRandom from 'lib/pickRandom';
import { IconButton } from 'module/common/component/Button';
import NoResults from './NoResults';

const noteIcons = ['book-open', 'sticky-note'];
const message = `There are currently no notes. Do you want to add the first one?`;

export default () => (
  <NoResults
    icon={pickRandom(noteIcons)}
    message={message}
    actions={
      <IconButton success icon="plus-circle" onClick={() => null}>
        Add Note
      </IconButton>
    }
  />
);
