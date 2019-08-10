import { Button, NonIdealState } from '@blueprintjs/core';
import React from 'react';

export default function NoAttributes({ onAddClick }) {
  return (
    <NonIdealState
      icon="id-number"
      description={`There are currently no attributes for this person.`}
      action={
        <Button icon="add" intent="success" onClick={onAddClick}>
          Add Attribute
        </Button>
      }
    />
  );
}
