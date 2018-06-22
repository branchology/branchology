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

  enum PersonEventType {
    BIRT
    BAPM
    DEAT
    BURI
  }

  type PersonEvent {
    id: ID!
    type: PersonEventType!
    date: String
    place: Place
  }

  type Person {
    id: ID!
    slug: String!
    sex: Sex
    names: [Name]
    events: [PersonEvent]
    birth: PersonEvent
    death: PersonEvent
    sourceCitations: [SourceCitation]
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
