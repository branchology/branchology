import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import fetchPerson from '../../../query/fetchPerson';

const createSpouseMutation = gql`
  mutation createSpouse(
    $personId: ID!
    $sex: Sex!
    $name: NameInput!
    $birth: EventInput
    $death: EventInput
    $marriage: EventInput
  ) {
    createSpouse(
      personId: $personId
      sex: $sex
      name: $name
      birth: $birth
      death: $death
      marriage: $marriage
    ) {
      error
      relationship {
        id
      }
    }
  }
`;

export default WrappedComponent => props => (
  <Mutation
    mutation={createSpouseMutation}
    refetchQueries={[
      { query: fetchPerson, variables: { id: props.person.id } },
    ]}
  >
    {createSpouse => (
      <WrappedComponent
        createSpouse={variables => createSpouse({ variables })}
        {...props}
      />
    )}
  </Mutation>
);
