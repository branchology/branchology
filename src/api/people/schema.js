export default `
  enum Sex {
    M
    F
  }

  type Name {
    id: ID!
    given: String
    surname: String
  }

  type PersonEvent {
    id: ID!
    date: String
  }

  type Person {
    id: ID!
    slug: String!
    sex: Sex
    names: [Name]
  }

  type PeopleCollection {
    items: [Person]
    paging: PagingInfo
  }

  input PersonFilter {
    nameContains: String
  }

  extend type Query {
    person(id: ID!): Person
    people(
      filter: PersonFilter
      sorting: SortingInput
      paging: PagingInput
    ): PeopleCollection
  }
`;
