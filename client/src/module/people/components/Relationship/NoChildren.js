import { Button, NonIdealState } from '@blueprintjs/core';
import React from 'react';

export default function NoAttributes({ onAction }) {
  return (
    <NonIdealState
      icon="people"
      description={`There are currently no recorded children of this relationship.`}
      action={
        <Button icon="add" intent="success" onClick={onAction}>
          Add Child
        </Button>
      }
    />
  );
}
