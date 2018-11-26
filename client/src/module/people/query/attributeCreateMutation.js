import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import eventFull from './fragment/eventFull';
import personFragment from './fragment/personFragment';

const attributeCreateMutation = gql`
  mutation addPersonAttribute($personId: ID!, $attribute: CreateAttributeInput!) {
    addPersonAttribute(personId: $personId, attribute: $attribute) {
      errors {
        field
        message
        details
      }
      attribute {
        ${eventFull}
        data
        isPreferred
      }
    }
  }
`;

const connect = graphql(attributeCreateMutation, {
  name: 'addPersonAttribute',
  options: function({ person: { id: personId } }) {
    return {
      update: function(cache, { data: { addPersonAttribute } }) {
        if (!addPersonAttribute.attribute) {
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
          const { attributes, ...other } = cachedPerson;

          const newPerson = {
            ...other,
            attributes: [...attributes],
          };
          newPerson.attributes.push(addPersonAttribute.attribute);

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
