import gql from 'graphql-tag';

export default gql`
  mutation updatePersonName($id: ID!, $name: UpdateNameInput!) {
    updatePersonName(id: $id, name: $name) {
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
