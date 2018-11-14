import React, { useState } from 'react';
import { graphql } from 'react-apollo';
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
          onConfirm={() =>
            removePersonName({ variables: { personNameId: name.id } }).then(
              () => toggleConfirm(),
            )
          }
          onCancel={toggleConfirm}
        />
      )}
      <IconButton danger icon="trash" onClick={() => toggleConfirm(true)}>
        Delete
      </IconButton>
    </>
  );
};

const withGraphql = graphql(nameDeleteMutation, {
  name: 'removePersonName',
});

export default withGraphql(RemovePersonName);
