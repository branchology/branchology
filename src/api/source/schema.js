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
`;
