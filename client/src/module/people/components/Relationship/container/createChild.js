import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'module/common';
import fetchPerson from '../../../query/fetchPerson';

const createChildMutation = gql`
  mutation createChild(
    $relationshipId: ID!
    $sex: Sex!
    $name: NameInput!
    $lineage: LineageType
    $birth: EventInput
    $death: EventInput
  ) {
    createChild(
      relationshipId: $relationshipId
      sex: $sex
      name: $name
      lineage: $lineage
      birth: $birth
      death: $death
    ) {
      errors {
        field
        message
        details
      }
      person {
        id
      }
    }
  }
`;

export default WrappedComponent => props => (
  <Mutation
    mutation={createChildMutation}
    refetchQueries={[
      { query: fetchPerson, variables: { id: props.person.id } },
    ]}
  >
    {createChild => (
      <WrappedComponent
        createChild={variables => createChild({ variables })}
        {...props}
      />
    )}
  </Mutation>
);
