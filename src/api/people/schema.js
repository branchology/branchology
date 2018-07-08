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
    sourceCitations: [SourceCitation]
    notes: [Note]
  }

  type Person {
    id: ID!
    slug: String!
    sex: Sex
    name: Name
    names: [Name]
    events: [PersonEvent]
    birth: PersonEvent
    death: PersonEvent
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
