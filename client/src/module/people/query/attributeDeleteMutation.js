import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import fetchPerson from './fetchPerson';

const attributeRemoveMutation = gql`
  mutation removePersonAttribute($attributeId: ID!) {
    removePersonAttribute(attributeId: $attributeId) {
      errors {
        field
        message
        details
      }
      removed
    }
  }
`;

function rm(fn) {
  return function(attributeId) {
    return fn({ variables: { attributeId } });
  };
}

export default WrappedComponent => props => {
  const refetchQueries = [
    { query: fetchPerson, variables: { id: props.person.id } },
  ];
  return (
    <Mutation
      mutation={attributeRemoveMutation}
      refetchQueries={refetchQueries}
    >
      {remove => <WrappedComponent remove={rm(remove)} {...props} />}
    </Mutation>
  );
};
