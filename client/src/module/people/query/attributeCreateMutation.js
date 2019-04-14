import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import personFragment from './fragment/personFragment';

const attributeCreateMutation = gql`
  mutation addPersonAttribute($personId: ID!, $attribute: CreateAttributeInput!, $citations: [CreateSourceCitationInput]) {
    addPersonAttribute(personId: $personId, attribute: $attribute, citations: $citations) {
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
