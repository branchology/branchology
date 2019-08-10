import { Button, NonIdealState } from '@blueprintjs/core';
import React from 'react';

export default function NoAttributes({ onAction }) {
  return (
    <NonIdealState
      icon="document"
      description={`There are currently no notes.`}
      action={
        <Button icon="add" intent="success" onClick={onAction}>
          Add Note
        </Button>
      }
    />
  );
}
