import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import fetchPerson from './fetchPerson';

const nameDeleteMutation = gql`
  mutation removePersonName($personNameId: ID!) {
    removePersonName(personNameId: $personNameId) {
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
  return function(personNameId) {
    return fn({ variables: { personNameId } });
  };
}

const DeleteWrapper = WrappedComponent => props => {
  const refetchQueries = [
    { query: fetchPerson, variables: { id: props.person.id } },
  ];

  return (
    <Mutation mutation={nameDeleteMutation} refetchQueries={refetchQueries}>
      {removePersonName => (
        <WrappedComponent removePersonName={rm(removePersonName)} {...props} />
      )}
    </Mutation>
  );
};

export default DeleteWrapper;
