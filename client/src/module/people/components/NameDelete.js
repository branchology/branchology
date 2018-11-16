import React, { useState } from 'react';
import { IconButton } from 'module/common/Buttons';
import Confirm from 'module/common/Confirm';
import nameDeleteMutation from '../query/nameDeleteMutation';

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
      <IconButton danger icon="trash" onClick={() => toggleConfirm(true)}>
        Delete
      </IconButton>
    </>
  );
};

export default nameDeleteMutation(RemovePersonName);
