import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import SourceCitationList from '../SourceCitationList';

const addPersonNameCitationMutation = gql`
  mutation addPersonNameCitation(
    $nameId: ID!
    $citation: CreateSourceCitationInput!
  ) {
    addPersonNameCitation(nameId: $nameId, citation: $citation) {
      errors
      citation {
        id
        source
        citation
        page
      }
    }
  }
`;

// addPersonNameCitation(nameId: ID!, citation: CreateSourceCitationInput!): NamePayload

const NameCitationManagementWrapper = compose(
  graphql(addPersonNameCitationMutation, {
    name: 'addCitation',
  }),
);

// Todo -- finish this to wrap SourceCitationList for a personName and wire it in to see if this shit works???

export default NameCitationManagementWrapper(SourceCitationList);
