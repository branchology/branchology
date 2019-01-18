import React from 'react';
import { components } from 'module/common';

const {
  ui: { Icon },
} = components;

export default ({ isPreferred, onClick }) => (
  <>
    {isPreferred ? (
      <Icon icon="circle" title="Default/preferred record" xs primary />
    ) : (
      <Icon
        icon="circle"
        title="Secondary/alternative record"
        xs
        disabled
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      />
    )}
  </>
);
