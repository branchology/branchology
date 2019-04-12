import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import personFragment from './fragment/personFragment';

const attributeRemoveMutation = gql`
  mutation removePersonAttribute($attributeId: ID!) {
    removePersonAttribute(attributeId: $attributeId) {
      errors {
        field
        message
        details
      }
      removed
      person {
        ${personFragment}
      }
    }
  }
`;

function rm(fn) {
  return function(attributeId) {
    return fn({ variables: { attributeId } });
  };
}

export default WrappedComponent => props => {
  return (
    <Mutation mutation={attributeRemoveMutation}>
      {remove => <WrappedComponent remove={rm(remove)} {...props} />}
    </Mutation>
  );
};
