import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import personFragment from './fragment/personFragment';

const personEventRemoveMutation = gql`
  mutation removePersonEvent($eventId: ID!) {
    removePersonEvent(eventId: $eventId) {
      errors {
        field
        message
        details
      }
      removed
    }
  }
`;

const DeleteWrapper = Component => props => {
  function removeEventFromStorage(cache) {
    const cachedPerson = cache.readFragment({
      id: `Person:${props.person.id}`,
      fragment: gql`
        fragment personFragment on Person {
          ${personFragment}
        }
      `,
    });

    if (cachedPerson) {
      const { events, ...other } = cachedPerson;
      const newPerson = {
        ...other,
        events: events.filter(n => n.id !== props.data.id),
      };

      cache.writeFragment({
        id: `Person:${props.person.id}`,
        fragment: gql`
          fragment personFragment on Person {
            ${personFragment}
          }
        `,
        data: newPerson,
      });
    }
  }

  return (
    <Mutation
      mutation={personEventRemoveMutation}
      update={removeEventFromStorage}
    >
      {remove => (
        <Component
          remove={eventId => {
            return remove({
              variables: { eventId },
            });
          }}
          {...props}
        />
      )}
    </Mutation>
  );
};

export default DeleteWrapper;
