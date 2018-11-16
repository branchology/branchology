export default `
  scalar JSON

  type ErrorDetails {
    field: String!
    message: String!
    details: JSON
  }

  type PagingInfo {
    perPage: Int
    page: Int
    totalPages: Int
    totalRecords: Int
  }

  input PagingInput {
    page: Int
    perPage: Int
  }

  input SortingInput {
    field: String
    order: SortOrder
  }

  enum SortOrder {
    ASC
    DESC
  }

  type Query {
    noop: Boolean
  }

  type Mutation {
    noop: Boolean
  }
`;