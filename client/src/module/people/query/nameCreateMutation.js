import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import fetchPerson from './fetchPerson';

const nameCreateMutation = gql`
  mutation addPersonName($personId: ID!, $name: CreateNameInput!) {
    addPersonName(personId: $personId, name: $name) {
      errors {
        field
        message
        details
      }
      name {
        id
      }
    }
  }
`;

export default WrappedComponent => props => {
  const refetchQueries = [
    { query: fetchPerson, variables: { id: props.person.id } },
  ];

  return (
    <Mutation mutation={nameCreateMutation} refetchQueries={refetchQueries}>
      {addPersonName => (
        <WrappedComponent addPersonName={addPersonName} {...props} />
      )}
    </Mutation>
  );
};
