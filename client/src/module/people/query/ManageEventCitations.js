import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'module/common';
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

const AddCitationWrapper = WrappedComponent => props => (
  <Mutation mutation={addPersonEventCitationMutation}>
    {addCitation => <WrappedComponent addCitation={addCitation} {...props} />}
  </Mutation>
);

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

const UpdateCitationWrapper = WrappedComponent => props => (
  <Mutation mutation={updateEventCitation}>
    {updateCitation => (
      <WrappedComponent updateCitation={updateCitation} {...props} />
    )}
  </Mutation>
);

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

const RemoveCitationWrapper = WrappedComponent => props => (
  <Mutation mutation={removeEventCitation}>
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
