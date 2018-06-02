export default `
  enum Sex {
    MALE
    FEMALE
  }

  type Person {
    id: ID!
    slug: String!
    sex: Sex
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
