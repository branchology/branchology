import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import eventFull from './fragment/eventFull';

const attributeUpdateMutation = gql`
  mutation updateAttribute($id: ID!, $attribute: UpdateAttributeInput!) {
    updateAttribute(id: $id, attribute: $attribute) {
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

const connect = graphql(attributeUpdateMutation, {
  name: 'updateAttribute',
});

export default function Wrapper(Component) {
  return connect(Component);
}
