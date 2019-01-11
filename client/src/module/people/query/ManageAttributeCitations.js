import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
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

const AddCitationWrapper = WrappedComponent => props => (
  <Mutation mutation={addPersonAttributeCitationMutation}>
    {addCitation => <WrappedComponent addCitation={addCitation} {...props} />}
  </Mutation>
);

const updateCitationMutation = gql`
  mutation updateCitation($id: ID!, $citation: UpdateSourceCitationInput!) {
    updateCitation(id: $id, citation: $citation) {
      citation {
        ${citationFragment}
      }
      ${errors}
    }
  }
`;

const UpdateCitationWrapper = WrappedComponent => props => (
  <Mutation mutation={updateCitationMutation}>
    {updateCitation => (
      <WrappedComponent updateCitation={updateCitation} {...props} />
    )}
  </Mutation>
);

const removeAttributeCitationMutation = gql`
  mutation removeCitation($entityId: ID!, $citationId: ID!) {
    removeCitation: removePersonAttributeCitation(attributeId: $entityId, citationId: $citationId) {
      attribute {
        ${attributeFragment}
      }
      ${errors}
    }
  }
`;

const RemoveCitationWrapper = WrappedComponent => props => (
  <Mutation mutation={removeAttributeCitationMutation}>
    {removeCitation => (
      <WrappedComponent removeCitation={removeCitation} {...props} />
    )}
  </Mutation>
);

// insanity
export default WrappedComponent =>
  AddCitationWrapper(
    UpdateCitationWrapper(RemoveCitationWrapper(WrappedComponent)),
  );
