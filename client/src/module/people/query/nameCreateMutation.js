import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
      }
    }
  }
`;

const connect = graphql(nameCreateMutation, {
  name: 'addPersonName',
});

export default function Wrapper(Component) {
  return connect(Component);
}
