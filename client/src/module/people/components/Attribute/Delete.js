import React, { useState } from 'react';
import { IconButton } from 'module/common/component/Button';
import Confirm from 'module/common/Confirm';
import attributeDeleteMutation from '../../query/attributeDeleteMutation';

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
