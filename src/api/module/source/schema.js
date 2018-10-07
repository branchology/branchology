export default `
  type Source {
    id: ID!
    title: String!
  }

  type SourceCitation {
    id: ID!
    source: Source!
    citation: String
    page: String
  }

  input CreateSourceCitationInput {
    sourceId: ID
    source: String
    citation: String
    page: String
  }

  input UpdateSourceCitationInput {
    citation: String
    page: String
  }
`;
