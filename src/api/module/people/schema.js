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

  input CreateAttributeInput {
    data: String!
    event: CreateEventInput!
  }

  input UpdateAttributeInput {
    data: String
    event: UpdateEventInput
  }

  input CreateNameInput {
    given: String
    surname: String
  }

  input NameInput {
    given: String
    surname: String
  }

  # TODO: FIXME: move this to events...
  input EventInput {
    type: String!
    date: String
    placeId: ID
    place: String
  }

  input UpdateEventInput {
    id: ID!
  }

  type AttributePayload {
    attribute: Attribute
    error: ErrorDetails
  }

  type EventPayload {
    error: ErrorDetails
    event: Event
  }

  type NamePayload {
    error: ErrorDetails
    name: Name
  }

  type PersonPayload {
    error: ErrorDetails
    person: Person
  }

  extend type Query {
    person(id: ID!): Person
    people(
      filter: PersonFilter
      sorting: [SortingInput]
      paging: PagingInput
    ): PeopleCollection
  }

  extend type Mutation {
    addPersonAttribute(personId: ID!, attribute: CreateAttributeInput!, citations: [CreateSourceCitationInput]): AttributePayload
    addPersonEvent(personId: ID!, event: CreateEventInput!, citations: [CreateSourceCitationInput]): EventPayload
    addPersonName(personId: ID!, name: CreateNameInput!, citations: [CreateSourceCitationInput]): NamePayload
    createPerson(name: CreateNameInput!, birth: CreateEventInput, death: CreateEventInput, sex: Sex!): PersonPayload

    removePersonName(personNameId: ID): Boolean

    updateAttribute(id: ID!, attribute: UpdateAttributeInput!): AttributePayload
  }
`;
