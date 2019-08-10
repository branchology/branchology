import { Button, NonIdealState } from '@blueprintjs/core';
import React from 'react';

export default function NoAttributes({ onAction }) {
  return (
    <NonIdealState
      icon="heart-broken"
      description={`There are currently no relationships for this person.`}
      action={
        <Button icon="add" intent="success" onClick={onAction}>
          Add Relationship
        </Button>
      }
    />
  );
}
