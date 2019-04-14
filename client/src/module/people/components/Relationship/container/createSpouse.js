import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'module/common';
import personFragment from '../../../query/fragment/personFragment';

const createSpouseMutation = gql`
  mutation createSpouse(
    $personId: ID!
    $sex: Sex!
    $name: NameInput!
    $birth: EventInput
    $death: EventInput
    $marriage: EventInput
    $citations: [CreateSourceCitationInput]
  ) {
    createSpouse(
      personId: $personId
      sex: $sex
      name: $name
      birth: $birth
      death: $death
      marriage: $marriage
      citations: $citations
    ) {
      error
      person {
        ${personFragment}
      }
    }
  }
`;

export default WrappedComponent => props => (
  <Mutation mutation={createSpouseMutation}>
    {createSpouse => (
      <WrappedComponent
        createSpouse={variables => createSpouse({ variables })}
        {...props}
      />
    )}
  </Mutation>
);
