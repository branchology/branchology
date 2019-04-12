import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import personFragment from './fragment/personFragment';

const attributeCreateMutation = gql`
  mutation addPersonAttribute($personId: ID!, $attribute: CreateAttributeInput!) {
    addPersonAttribute(personId: $personId, attribute: $attribute) {
      errors {
        field
        message
        details
      }
      person {
        ${personFragment}
      }
    }
  }
`;

export default WrappedComponent => props => {
  return (
    <Mutation mutation={attributeCreateMutation}>
      {addPersonAttribute => (
        <WrappedComponent addPersonAttribute={addPersonAttribute} {...props} />
      )}
    </Mutation>
  );
};
