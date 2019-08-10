import { Alert, Button } from '@blueprintjs/core';
import React, { useState } from 'react';
import attributeDeleteMutation from '../../query/attributeDeleteMutation';

const RemoveWithConfirm = ({ data, remove }) => {
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
        onConfirm={() => remove(data.id)}
      >
        <p>Are you sure you want to permanently remove this attribute?</p>
      </Alert>

      <Button
        intent="danger"
        icon="cross"
        minimal
        small
        onClick={() => toggleConfirm(true)}
      />
    </>
  );
};

export default attributeDeleteMutation(RemoveWithConfirm);
