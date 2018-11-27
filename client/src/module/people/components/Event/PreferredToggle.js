import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import PreferredRecord from '../PreferredRecord';
import eventFull from '../../query/fragment/eventFull';

const makePersonEventPreferredMutation = gql`
  mutation makePersonEventPreferred($personEventId: ID!) {
    makePersonEventPreferred(personEventId: $personEventId) {
      errors {
        field
        message
        details
      }
      person {
        id
        events {
          ${eventFull}
          isPreferred
        }
      }
    }
  }
`;

const MutationWrapper = Component => props => (
  <Mutation mutation={makePersonEventPreferredMutation}>
    {makePersonEventPreferred => (
      <Component
        makePersonEventPreferred={makePersonEventPreferred}
        {...props}
      />
    )}
  </Mutation>
);

const EventPreferredToggle = ({ personEvent, makePersonEventPreferred }) => (
  <PreferredRecord
    isPreferred={personEvent.isPreferred}
    onClick={() =>
      makePersonEventPreferred({ variables: { personEventId: personEvent.id } })
    }
  />
);

export default MutationWrapper(EventPreferredToggle);
