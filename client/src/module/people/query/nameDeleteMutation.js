import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import personFragment from './fragment/personFragment';

const nameDeleteMutation = gql`
  mutation removePersonName($personNameId: ID!) {
    removePersonName(personNameId: $personNameId) {
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
  return function(personNameId) {
    return fn({ variables: { personNameId } });
  };
}

const DeleteWrapper = WrappedComponent => props => {
  return (
    <Mutation mutation={nameDeleteMutation}>
      {removePersonName => (
        <WrappedComponent removePersonName={rm(removePersonName)} {...props} />
      )}
    </Mutation>
  );
};

export default DeleteWrapper;
