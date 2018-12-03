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
    sourceId: ID
    source: String
    citation: String
    page: String
  }

  type SourceCollection {
    items: [Source]
    paging: PagingInfo
  }

  type CitationPayload {
    errors: [ErrorDetails]
    citation: SourceCitation
  }

  extend type Query {
    sources(
      search: String
      sorting: [SortingInput]
      paging: PagingInput
    ): SourceCollection
  }

  extend type Mutation {
    updateCitation(id: ID!, citation: UpdateSourceCitationInput!): CitationPayload
  }
`;
