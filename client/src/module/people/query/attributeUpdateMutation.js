import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import eventFull from './fragment/eventFull';

const attributeUpdateMutation = gql`
  mutation updateAttribute($id: ID!, $attribute: UpdateAttributeInput!) {
    updateAttribute(id: $id, attribute: $attribute) {
      errors {
        field
        message
        details
      }
      attribute {
        ${eventFull}
        data
        isPreferred
      }
    }
  }
`;

export default WrappedComponent => props => (
  <Mutation mutation={attributeUpdateMutation}>
    {updateAttribute => (
      <WrappedComponent updateAttribute={updateAttribute} {...props} />
    )}
  </Mutation>
);
