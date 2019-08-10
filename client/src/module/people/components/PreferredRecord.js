import { Icon, Tooltip } from '@blueprintjs/core';
import React from 'react';

export default ({ isPreferred, onClick }) => (
  <>
    {isPreferred ? (
      <Tooltip content="This is the preferred event when more than one are recorded">
        <Icon icon="dot" intent="primary" />
      </Tooltip>
    ) : (
      <Tooltip content="This is a secondary/alternative event record. Click to mark this event as the preferred">
        <Icon
          icon="dot"
          intent="disabled"
          onClick={onClick}
          style={{ cursor: 'pointer' }}
        />
      </Tooltip>
    )}
  </>
);
