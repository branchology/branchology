import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import personFragment from '../query/fragment/personFragment';

const addEventMutation = gql`
  mutation addEvent($id: ID!, $event: CreateEventInput!) {
    addEvent: addPersonEvent(personId: $id, event: $event) {
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

const removeEventMutation = gql`
  mutation removeEvent($eventId: ID!) {
    removeEvent: removePersonEvent(eventId: $eventId) {
      errors {
        field
        message
        details
      }
      removed
      person {
        ${personFragment}
      }
    }
  }
`;

export default WrappedComponent => props => (
  <Mutation mutation={addEventMutation}>
    {addEvent => (
      <Mutation mutation={removeEventMutation}>
        {removeEvent => (
          <WrappedComponent
            addEvent={addEvent}
            removeEvent={eventId => removeEvent({ variables: { eventId } })}
            {...props}
          />
        )}
      </Mutation>
    )}
  </Mutation>
);
