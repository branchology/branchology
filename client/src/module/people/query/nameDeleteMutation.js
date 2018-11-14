import gql from 'graphql-tag';

export default gql`
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
