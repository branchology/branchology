import gql from 'graphql-tag';

export default gql`
  fragment BasicEventDetailsFragment on Event {
    id
    type
    date
    place {
      id
      description
    }
  }

  fragment SourceCitationFragment on SourceCitation {
    id
    citation
    page
    source {
      id
      title
    }
  }

  fragment FullEventDetailsFragment on Event {
    ...BasicEventDetailsFragment
    sourceCitations {
      ...SourceCitationFragment
    }
  }

  mutation updateAttribute($id: ID!, $attribute: UpdateAttributeInput!) {
    updateAttribute(id: $id, attribute: $attribute) {
      error {
        message
        details
      }
      attribute {
        id
        data
        event {
          ...FullEventDetailsFragment
        }
      }
    }
  }
`;
