import { Alert, Button } from '@blueprintjs/core';
import React, { useState } from 'react';
import nameDeleteMutation from '../../query/nameDeleteMutation';

const RemovePersonName = ({ name, removePersonName }) => {
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
        onConfirm={() => removePersonName(name.id)}
      >
        <p>Are you sure you want to permanently remove this name?</p>
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

export default nameDeleteMutation(RemovePersonName);
