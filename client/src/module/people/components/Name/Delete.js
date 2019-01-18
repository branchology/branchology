import React, { useState } from 'react';
import { components } from 'module/common';
import nameDeleteMutation from '../../query/nameDeleteMutation';

const {
  ui: { Confirm, IconButton },
} = components;

const RemovePersonName = ({ name, removePersonName }) => {
  const [confirmOpen, toggle] = useState(false);
  const toggleConfirm = () => toggle(!confirmOpen);

  return (
    <>
      {confirmOpen && (
        <Confirm
          title="Warning"
          icon="exclamation-triangle"
          message="Are you sure you want to permanently remove this name?"
          onConfirm={() => removePersonName(name.id)}
          onCancel={toggleConfirm}
        />
      )}
      <IconButton danger icon="trash" onClick={() => toggleConfirm(true)} />
    </>
  );
};

export default nameDeleteMutation(RemovePersonName);
