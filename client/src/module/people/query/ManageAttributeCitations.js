import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import citationFragment from './fragment/citation';
import attributeFragment from './fragment/attribute';

const errors = `errors {
  field
  message
  details
}`;

const addPersonAttributeCitationMutation = gql`
  mutation addCitation($entityId: ID!, $citation: CreateSourceCitationInput!) {
    addCitation: addPersonAttributeCitation(attributeId: $entityId, citation: $citation) {
      entity: attribute {
        ${attributeFragment}
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

const removeAttributeCitation = gql`
  mutation removeCitation($entityId: ID!, $citationId: ID!) {
    removeCitation: removePersonAttributeCitation(attributeId: $entityId, citationId: $citationId) {
      attribute {
        ${attributeFragment}
      }
      ${errors}
    }
  }
`;

const ManageAttributeCitations = compose(
  graphql(addPersonAttributeCitationMutation, {
    name: 'addCitation',
  }),
  graphql(updateCitation, {
    name: 'updateCitation',
  }),
  graphql(removeAttributeCitation, {
    name: 'removeCitation',
  }),
);

export default ManageAttributeCitations;
