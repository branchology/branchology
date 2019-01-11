import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';

const nameUpdateMutation = gql`
  mutation updatePersonName($id: ID!, $name: UpdateNameInput!) {
    updatePersonName(id: $id, name: $name) {
      errors {
        field
        message
        details
      }
      name {
        id
        given
        surname
      }
    }
  }
`;

export default WrappedComponent => props => (
  <Mutation mutation={nameUpdateMutation}>
    {updatePersonName => (
      <WrappedComponent updatePersonName={updatePersonName} {...props} />
    )}
  </Mutation>
);
