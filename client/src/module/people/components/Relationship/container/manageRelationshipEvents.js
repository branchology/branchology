import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
import relationshipFragment from '../../../query/fragment/relationship';

const addEventMutation = gql`
  mutation addEvent($id: ID!, $event: CreateEventInput!, $citations: [CreateSourceCitationInput]) {
    addEvent: addRelationshipEvent(relationshipId: $id, event: $event, citations: $citations) {
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

const removeEventMutation = gql`
  mutation removeEvent($eventId: ID!) {
    removeEvent: removeRelationshipEvent(eventId: $eventId) {
      errors {
        field
        message
        details
      }
      removed
      relationship {
        ${relationshipFragment}
      }
    }
  }
`;

export default WrappedComponent => props => {
  return (
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
};
