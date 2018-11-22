export default `
  type Place {
    id: ID!
    description: String!
    address: String
    address2: String
    city: String
    stateProvince: String
    country: String
  }

  type Event {
    id: ID!
    type: String!
    date: String
    place: Place
    isPreferred: Boolean
    sourceCitations: [SourceCitation]
    notes: [Note]
  }

  input CreateEventInput {
    type: String!
    date: String
    placeId: ID
    place: String
  }

  type PlaceCollection {
    items: [Place]
    paging: PagingInfo
  }

  extend type Query {
    places(
      search: String
      sorting: [SortingInput]
      paging: PagingInput
    ): PlaceCollection
  }
`;
