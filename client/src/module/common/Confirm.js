import React from 'react';
import { Button } from 'module/common/form';

import { Dialog, StandardDialogHeader } from 'module/common/modal';

export default ({ onCancel, onConfirm, message, title }) => (
  <Dialog
    header={<StandardDialogHeader title={title} />}
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
