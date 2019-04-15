import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'module/common';
import relationshipFragment from '../../../query/fragment/relationship';

const createChildMutation = gql`
  mutation createChild(
    $relationshipId: ID!
    $sex: Sex!
    $name: NameInput!
    $lineage: LineageType
    $birth: EventInput
    $death: EventInput
    $citations: [CreateSourceCitationInput]
  ) {
    createChild(
      relationshipId: $relationshipId
      sex: $sex
      name: $name
      lineage: $lineage
      birth: $birth
      death: $death
      citations: $citations
    ) {
      errors {
        field
        message
        details
      }
      relationship {
        ${relationshipFragment}
      }
    }
  }
`;

export default WrappedComponent => props => (
  <Mutation mutation={createChildMutation}>
    {createChild => (
      <WrappedComponent
        createChild={variables => createChild({ variables })}
        {...props}
      />
    )}
  </Mutation>
);
