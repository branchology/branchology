import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import citationFragment from './fragment/citation';
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
  mutation updateCitation($id: ID!, $citation: UpdateSourceCitationInput!) {
    updateCitation(id: $id, citation: $citation) {
      citation {
        ${citationFragment}
      }
      ${errors}
    }
  }
`;

const removeEventCitation = gql`
  mutation removeCitation($entityId: ID!, $citationId: ID!) {
    removeCitation: removePersonEventCitation(eventId: $entityId, citationId: $citationId) {
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
