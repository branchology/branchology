import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import fetchPerson from '../../../query/fetchPerson';
import eventFull from '../../../query/fragment/eventFull';

const addEventMutation = gql`
  mutation addEvent($id: ID!, $event: CreateEventInput!) {
    addEvent: addRelationshipEvent(relationshipId: $id, event: $event) {
      errors {
        field
        message
        details
      }
      event {
        ${eventFull}
        isPreferred
      }
    }
  }
`;

const removeEventMutation = gql`
  mutation removeEvent($eventId: ID!) {
    removeEvent: removeRelationshipEvent(eventId: $eventId) {
      errors {
        field
        message
        details
      }
      removed
    }
  }
`;

export default WrappedComponent => props => {
  const refetchQueries = [
    { query: fetchPerson, variables: { id: props.person.id } },
  ];

  return (
    <Mutation mutation={addEventMutation} refetchQueries={refetchQueries}>
      {addEvent => (
        <Mutation
          mutation={removeEventMutation}
          refetchQueries={refetchQueries}
        >
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
};
