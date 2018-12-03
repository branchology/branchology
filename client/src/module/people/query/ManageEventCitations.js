import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import eventFull from './fragment/eventFull';

const errors = `errors {
  field
  message
  details
}`;

const addPersonEventCitationMutation = gql`
  mutation addCitation($entityId: ID!, $citation: CreateSourceCitationInput!) {
    addCitation: addPersonEventCitation(eventId: $entityId, citation: $citation) {
      entity: event {
        ${eventFull}
      }
      ${errors}
    }
  }
`;

const updateEventCitation = gql`
  mutation updateCitation($citationId: ID!, $citation: UpdateSourceCitationInput!) {
    updateEventCitation(citationId: $citationId, citation: $citation) {
      event {
        ${eventFull}
      }
      ${errors}
    }
  }
`;

const removeEventCitation = gql`
  mutation removeCitation($eventId: ID!, $citationId: ID!) {
    removeEventCitation(id: $id, snoozedUntil: $snoozedUntil) {
      event {
        ${eventFull}
      }
      ${errors}
    }
  }
`;

const ManageEventCitations = compose(
  graphql(addPersonEventCitationMutation, {
    name: 'addCitation',
  }),
  graphql(updateEventCitation, {
    name: 'updateCitation',
  }),
  graphql(removeEventCitation, {
    name: 'removeCitation',
  }),
);

export default ManageEventCitations;
