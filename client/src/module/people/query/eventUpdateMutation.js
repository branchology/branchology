import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import eventFull from './fragment/eventFull';

const eventUpdateMutation = gql`
  mutation updateEvent($id: ID!, $event: UpdateEventInput!) {
    updateEvent(id: $id, event: $event) {
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

const connect = graphql(eventUpdateMutation, {
  name: 'updateEvent',
});

export default function Wrapper(Component) {
  return connect(Component);
}
