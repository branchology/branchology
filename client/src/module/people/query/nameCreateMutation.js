import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import personFragment from './fragment/personFragment';

const nameCreateMutation = gql`
  mutation addPersonName($personId: ID!, $name: CreateNameInput!) {
    addPersonName(personId: $personId, name: $name) {
      errors {
        field
        message
        details
      }
      name {
        id
        given
        surname
        isPreferred
        sourceCitations {
          id
          citation
          page
          source {
            id
            title
          }
        }
      }
    }
  }
`;

const connect = graphql(nameCreateMutation, {
  name: 'addPersonName',
  options: function({ name: { personId } }) {
    return {
      update: function(cache, { data: { addPersonName } }) {
        if (!addPersonName.name) {
          return;
        }

        const cachedPerson = cache.readFragment({
          id: `Person:${personId}`,
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
            names: [...names],
          };
          newPerson.names.push(addPersonName.name);

          cache.writeFragment({
            id: `Person:${personId}`,
            fragment: gql`
              fragment personFragment on Person {
                ${personFragment}
              }
            `,
            data: newPerson,
          });
        }
      },
    };
  },
});

export default function Wrapper(Component) {
  return connect(Component);
}
