import React, { useState } from 'react';
import { components } from 'module/common';
import attributeDeleteMutation from '../../query/attributeDeleteMutation';

const {
  ui: { Confirm, IconButton },
} = components;

const RemoveWithConfirm = ({ data, remove }) => {
  const [confirmOpen, toggle] = useState(false);
  const toggleConfirm = () => toggle(!confirmOpen);

  return (
    <>
      {confirmOpen && (
        <Confirm
          title="Warning"
          icon="exclamation-triangle"
          message="Are you sure you want to permanently remove this data?"
          onConfirm={() => remove(data.id)}
          onCancel={toggleConfirm}
        />
      )}
      <IconButton danger icon="trash" onClick={() => toggleConfirm(true)} />
    </>
  );
};

export default attributeDeleteMutation(RemoveWithConfirm);
