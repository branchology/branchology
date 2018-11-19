import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import PreferredRecord from '../PreferredRecord';
import nameBasics from '../../query/fragment/nameBasics';

const makePersonNamePreferredMutation = gql`
  mutation makePersonNamePreferred($personNameId: ID!) {
    makePersonNamePreferred(personNameId: $personNameId) {
      errors {
        field
        message
        details
      }
      person {
        id
        names {
          ${nameBasics}
          isPreferred
        }
      }
    }
  }
`;

const MutationWrapper = Component => props => (
  <Mutation mutation={makePersonNamePreferredMutation}>
    {makePersonNamePreferred => (
      <Component makePersonNamePreferred={makePersonNamePreferred} {...props} />
    )}
  </Mutation>
);

const NamePreferredToggle = ({ name, makePersonNamePreferred }) => (
  <PreferredRecord
    isPreferred={name.isPreferred}
    onClick={() =>
      makePersonNamePreferred({ variables: { personNameId: name.id } })
    }
  />
);

export default MutationWrapper(NamePreferredToggle);
