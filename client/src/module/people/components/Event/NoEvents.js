import { Button, NonIdealState } from '@blueprintjs/core';
import React from 'react';

export default function NoAttributes({ onAddClick, type }) {
  return (
    <NonIdealState
      icon="calendar"
      description={`There are currently no events for this ${type}.`}
      action={
        <Button icon="add" intent="success" onClick={onAddClick}>
          Add Event
        </Button>
      }
    />
  );
}
