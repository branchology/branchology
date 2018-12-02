import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import PreferredRecord from '../PreferredRecord';
import eventFull from '../../query/fragment/eventFull';

const makePersonEventPreferredMutation = gql`
  mutation makePersonEventPreferred($eventId: ID!) {
    makePersonEventPreferred(eventId: $eventId) {
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

const EventPreferredToggle = ({ event, makePersonEventPreferred }) => (
  <PreferredRecord
    isPreferred={event.isPreferred}
    onClick={() =>
      makePersonEventPreferred({ variables: { eventId: event.id } })
    }
  />
);

export default MutationWrapper(EventPreferredToggle);
