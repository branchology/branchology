import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import eventFull from './fragment/eventFull';
import personFragment from './fragment/personFragment';

const eventCreateMutation = gql`
  mutation addPersonEvent($personId: ID!, $event: CreateEventInput!) {
    addPersonEvent(personId: $personId, event: $event) {
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

const connect = graphql(eventCreateMutation, {
  name: 'addPersonEvent',
  options: function({ person: { id: personId } }) {
    return {
      update: function(cache, { data: { addPersonEvent } }) {
        if (!addPersonEvent.event) {
          return;
        }

        const cachedPerson = cache.readFragment({
          id: `Person:${personId}`,
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
            events: [...events],
          };
          newPerson.events.push(addPersonEvent.event);

          cache.writeFragment({
            id: `Person:${personId}`,
            fragment: gql`
              fragment personFragment on Person {
                ${personFragment}
              }
            `,
            data: newPerson,
          });
        }
      },
    };
  },
});

export default function Wrapper(Component) {
  return connect(Component);
}
