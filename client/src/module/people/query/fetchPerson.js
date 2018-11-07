import gql from 'graphql-tag';

export default gql`
  fragment NameFragment on Name {
    id
    given
    surname
  }

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

  query fetchPerson($id: ID!) {
    person(id: $id) {
      id
      sex
      parents {
        id
        type
        relationship {
          id
          people {
            id
            name {
              ...NameFragment
            }
          }
        }
      }
      name {
        ...NameFragment
      }
      birth {
        ...BasicEventDetailsFragment
      }
      death {
        ...BasicEventDetailsFragment
      }
      events {
        ...FullEventDetailsFragment
      }
      attributes {
        id
        data
        event {
          ...FullEventDetailsFragment
        }
      }
      names {
        ...NameFragment
        sourceCitations {
          ...SourceCitationFragment
        }
      }
      relationships {
        id
        events {
          ...FullEventDetailsFragment
        }
        people {
          id
          name {
            ...NameFragment
          }
        }
        children {
          id
          person {
            id
            birth {
              ...BasicEventDetailsFragment
            }
            death {
              ...BasicEventDetailsFragment
            }
            name {
              ...NameFragment
            }
          }
        }
      }
      notes {
        id
        note
      }
    }
  }
`;
