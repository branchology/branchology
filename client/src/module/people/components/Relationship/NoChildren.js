import React from 'react';
import pickRandom from 'lib/pickRandom';
import { IconButton } from 'module/common/component/Button';
import WithUser from 'module/common/component/WithUser';
import NoResults from '../NoResults';

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
