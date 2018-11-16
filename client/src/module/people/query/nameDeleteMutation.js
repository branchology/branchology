import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import personFragment from './fragment/personFragment';

const nameDeleteMutation = gql`
  mutation removePersonName($personNameId: ID!) {
    removePersonName(personNameId: $personNameId) {
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
  function removeNameFromStorage(cache, { data: { removePersonName } }) {
    const cachedPerson = cache.readFragment({
      id: `Person:${props.person.id}`,
      fragment: gql`
        fragment personFragment on Person {
          ${personFragment}
        }
      `,
    });

    if (cachedPerson) {
      const { names, ...other } = cachedPerson;
      const newPerson = {
        ...other,
        names: names.filter(n => n.id !== props.name.id),
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
    <Mutation mutation={nameDeleteMutation} update={removeNameFromStorage}>
      {removePersonName => (
        <Component
          removePersonName={personNameId => {
            return removePersonName({
              variables: { personNameId },
            });
          }}
          {...props}
        />
      )}
    </Mutation>
  );
};

export default DeleteWrapper;
