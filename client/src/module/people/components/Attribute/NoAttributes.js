import React from 'react';
import pickRandom from 'lib/pickRandom';
import { IconButton } from 'module/common/component/Button';
import WithUser from 'module/common/component/WithUser';
import NoResults from '../NoResults';

const attributeIcons = [
  'user-astronaut',
  'user-graduate',
  'user-md',
  'user-ninja',
];

const message = `There are currently no attributes for this person.`;

export default () => (
  <NoResults
    icon={pickRandom(attributeIcons)}
    message={message}
    actions={
      <WithUser>
        <IconButton success icon="plus-circle" onClick={() => null}>
          Add Attribute
        </IconButton>
      </WithUser>
    }
  />
);
