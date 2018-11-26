import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import personFragment from './fragment/personFragment';

const attributeRemoveMutation = gql`
  mutation removePersonAttribute($attributeId: ID!) {
    removePersonAttribute(attributeId: $attributeId) {
      errors {
        field
        message
        details
      }
      removed
    }
  }
`;

const DeleteWrapper = Component => props => {
  function removeAttributeFromStorage(cache) {
    const cachedPerson = cache.readFragment({
      id: `Person:${props.person.id}`,
      fragment: gql`
        fragment personFragment on Person {
          ${personFragment}
        }
      `,
    });

    if (cachedPerson) {
      const { attributes, ...other } = cachedPerson;
      const newPerson = {
        ...other,
        attributes: attributes.filter(n => n.id !== props.data.id),
      };

      cache.writeFragment({
        id: `Person:${props.person.id}`,
        fragment: gql`
          fragment personFragment on Person {
            ${personFragment}
          }
        `,
        data: newPerson,
      });
    }
  }

  return (
    <Mutation
      mutation={attributeRemoveMutation}
      update={removeAttributeFromStorage}
    >
      {remove => (
        <Component
          remove={attributeId => {
            return remove({
              variables: { attributeId },
            });
          }}
          {...props}
        />
      )}
    </Mutation>
  );
};

export default DeleteWrapper;
