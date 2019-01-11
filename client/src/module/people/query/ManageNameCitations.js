import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
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

const AddCitationWrapper = WrappedComponent => props => (
  <Mutation mutation={addPersonNameCitationMutation}>
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

const removeNameCitationMutation = gql`
  mutation removeCitation($entityId: ID!, $citationId: ID!) {
    removeCitation: removePersonNameCitation(nameId: $entityId, citationId: $citationId) {
      name {
        ${nameFragment}
      }
      ${errors}
    }
  }
`;

const RemoveCitationWrapper = WrappedComponent => props => (
  <Mutation mutation={removeNameCitationMutation}>
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
