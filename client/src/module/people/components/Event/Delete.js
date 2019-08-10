import { Alert, Button } from '@blueprintjs/core';
import React, { useState } from 'react';

const RemoveWithConfirm = ({ data, removeEvent }) => {
  const [confirmOpen, toggle] = useState(false);
  const toggleConfirm = () => toggle(!confirmOpen);

  return (
    <>
      <Alert
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        icon="trash"
        intent="danger"
        isOpen={confirmOpen}
        onCancel={toggleConfirm}
        onConfirm={() =>
          removeEvent(data.id).then(
            ({
              data: {
                removeEvent: { removed },
              },
            }) => {
              if (removed) {
                toggleConfirm();
              }
            },
          )
        }
      >
        <p>Are you sure you want to permanently remove this event?</p>
      </Alert>

      <Button
        intent="danger"
        small
        minimal
        icon="cross"
        onClick={() => toggleConfirm(true)}
      />
    </>
  );
};

export default RemoveWithConfirm;
