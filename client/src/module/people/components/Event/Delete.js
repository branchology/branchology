import React, { useState } from 'react';
import { IconButton } from 'module/common/component/Button';
import Confirm from 'module/common/Confirm';

const RemoveWithConfirm = ({ data, removeEvent }) => {
  const [confirmOpen, toggle] = useState(false);
  const toggleConfirm = () => toggle(!confirmOpen);

  return (
    <>
      {confirmOpen && (
        <Confirm
          title="Warning"
          icon="exclamation-triangle"
          message="Are you sure you want to permanently remove this data?"
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
          onCancel={toggleConfirm}
        />
      )}
      <IconButton danger icon="trash" onClick={() => toggleConfirm(true)} />
    </>
  );
};

export default RemoveWithConfirm;
