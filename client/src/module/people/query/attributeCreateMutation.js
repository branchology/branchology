import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import fetchPerson from './fetchPerson';
import eventFull from './fragment/eventFull';

const attributeCreateMutation = gql`
  mutation addPersonAttribute($personId: ID!, $attribute: CreateAttributeInput!) {
    addPersonAttribute(personId: $personId, attribute: $attribute) {
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

export default WrappedComponent => props => {
  const refetchQueries = [
    { query: fetchPerson, variables: { id: props.person.id } },
  ];

  return (
    <Mutation
      mutation={attributeCreateMutation}
      refetchQueries={refetchQueries}
    >
      {addPersonAttribute => (
        <WrappedComponent addPersonAttribute={addPersonAttribute} {...props} />
      )}
    </Mutation>
  );
};
