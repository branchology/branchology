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
    sourceCitations: [SourceCitation]
    notes: [Note]
  }
`;
