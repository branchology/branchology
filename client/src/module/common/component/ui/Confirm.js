import React from 'react';
import { Button, Dialog } from './';

export const Confirm = ({ onCancel, onConfirm, message, title }) => (
  <Dialog
    title={title}
    footer={
      <div>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onConfirm}>
          OK
        </Button>
      </div>
    }
  >
    {message}
  </Dialog>
);
