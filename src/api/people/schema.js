export default `
  enum Sex {
    M
    F
  }

  type Name {
    id: ID!
    given: String
    surname: String
    sourceCitations: [SourceCitation]
    notes: [Note]
  }

  type Attribute {
    id: ID!
    data: String
    event: Event
  }

  type Person {
    id: ID!
    sex: Sex
    name: Name
    names: [Name]
    attributes: [Attribute]
    events: [Event]
    birth: Event
    death: Event
    sourceCitations: [SourceCitation]
    notes: [Note]
    parents: [Parents]
    relationships: [Relationship]
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
