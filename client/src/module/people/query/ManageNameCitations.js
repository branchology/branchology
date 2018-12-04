import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import citationFragment from './fragment/citation';
import nameFragment from './fragment/name';

const errors = `errors {
  field
  message
  details
}`;

const addPersonNameCitationMutation = gql`
  mutation addCitation($entityId: ID!, $citation: CreateSourceCitationInput!) {
    addCitation: addPersonNameCitation(nameId: $entityId, citation: $citation) {
      entity: name {
        ${nameFragment}
      }
      ${errors}
    }
  }
`;

const updateCitation = gql`
  mutation updateCitation($id: ID!, $citation: UpdateSourceCitationInput!) {
    updateCitation(id: $id, citation: $citation) {
      citation {
        ${citationFragment}
      }
      ${errors}
    }
  }
`;

const removeNameCitation = gql`
  mutation removeCitation($entityId: ID!, $citationId: ID!) {
    removeCitation: removePersonNameCitation(nameId: $entityId, citationId: $citationId) {
      name {
        ${nameFragment}
      }
      ${errors}
    }
  }
`;

const ManageNameCitations = compose(
  graphql(addPersonNameCitationMutation, {
    name: 'addCitation',
  }),
  graphql(updateCitation, {
    name: 'updateCitation',
  }),
  graphql(removeNameCitation, {
    name: 'removeCitation',
  }),
);

export default ManageNameCitations;
