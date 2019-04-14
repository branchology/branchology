import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import personFragment from '../query/fragment/personFragment';

const nameCreateMutation = gql`
  mutation addPersonName($personId: ID!, $name: CreateNameInput!, $citations: [CreateSourceCitationInput]) {
    addPersonName(personId: $personId, name: $name, citations: $citations) {
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
    <Mutation mutation={nameCreateMutation}>
      {addPersonName => (
        <WrappedComponent addPersonName={addPersonName} {...props} />
      )}
    </Mutation>
  );
};
