import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
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

export default WrappedComponent => props => (
  <Mutation mutation={eventUpdateMutation}>
    {updateEvent => <WrappedComponent updateEvent={updateEvent} {...props} />}
  </Mutation>
);
