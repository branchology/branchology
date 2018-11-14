import gql from 'graphql-tag';
import personFragment from './fragment/personFragment';

export default gql`
  query fetchPerson($id: ID!) {
    person(id: $id) {
      ${personFragment}
    }
  }
`;
