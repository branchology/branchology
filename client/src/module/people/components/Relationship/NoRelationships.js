import React from 'react';
import pickRandom from 'lib/pickRandom';
import { IconButton } from 'module/common/component/Button';
import WithUser from 'module/common/component/WithUser';
import NoResults from '../NoResults';

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
