export default `
  type Note {
    id: ID!
    note: String!
    rin: String
    sourceCitations: [SourceCitation]
  }
`;
