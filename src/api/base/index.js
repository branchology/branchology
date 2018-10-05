const schema = `
  scalar JSON

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

export { schema };
