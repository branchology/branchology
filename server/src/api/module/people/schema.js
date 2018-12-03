export default `
  enum Sex {
    M
    F
  }

  type Name {
    id: ID!
    given: String
    surname: String
    isPreferred: Boolean
    sourceCitations: [SourceCitation]
    notes: [Note]
  }

  type Attribute {
    id: ID!
    type: String!
    data: String
    date: String
    place: Place
    isPreferred: Boolean
    sourceCitations: [SourceCitation]
    notes: [Note]
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
    type: String!
    data: String
    date: String
    placeId: ID
    place: String
  }

  input UpdateAttributeInput {
    type: String!
    data: String
    date: String
    placeId: ID
    place: String
  }

  input CreateNameInput {
    given: String
    surname: String
    isPreferred: Boolean = False
  }

  input UpdateNameInput {
    given: String
    surname: String
    isPreferred: Boolean
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
    type: String!
    date: String
    placeId: ID
    place: String
  }

  type AttributePayload {
    attribute: Attribute
    errors: [ErrorDetails]
  }

  type EventPayload {
    errors: [ErrorDetails]
    event: Event
  }

  type NamePayload {
    errors: [ErrorDetails]
    name: Name
  }

  type PersonPayload {
    errors: [ErrorDetails]
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

  type RemoveRecordPayload {
    errors: [ErrorDetails]
    removed: Boolean
  }

  type PrimaryPersonNamePayload {
    errors: [ErrorDetails]
    person: Person
  }

  type PrimaryPersonEventPayload {
    errors: [ErrorDetails]
    person: Person
  }

  extend type Mutation {
    addPersonAttribute(personId: ID!, attribute: CreateAttributeInput!, citations: [CreateSourceCitationInput]): AttributePayload
    addPersonAttributeCitation(attributeId: ID!, citation: CreateSourceCitationInput!): AttributePayload
    addPersonCitation(personId: ID!, citation: CreateSourceCitationInput!): PersonPayload
    addPersonEvent(personId: ID!, event: CreateEventInput!, citations: [CreateSourceCitationInput]): EventPayload
    addPersonEventCitation(eventId: ID!, citation: CreateSourceCitationInput!): EventPayload
    addPersonName(personId: ID!, name: CreateNameInput!, citations: [CreateSourceCitationInput]): NamePayload
    addPersonNameCitation(nameId: ID!, citation: CreateSourceCitationInput!): NamePayload
    createPerson(name: CreateNameInput!, birth: CreateEventInput, death: CreateEventInput, sex: Sex!): PersonPayload

    makePersonEventPreferred(eventId: ID!): PrimaryPersonEventPayload
    makePersonNamePreferred(personNameId: ID!): PrimaryPersonNamePayload

    removePerson(personId: ID): Boolean
    removePersonAttribute(attributeId: ID!): RemoveRecordPayload!
    removePersonAttributeCitation(attributeId: ID!, citationId: ID!): AttributePayload!
    removePersonCitation(citationId: ID!): Boolean
    removePersonEvent(eventId: ID!): RemoveRecordPayload!
    removePersonEventCitation(eventId: ID!, citationId: ID!): EventPayload!
    removePersonName(personNameId: ID): RemoveRecordPayload!
    removePersonNameCitation(citationId: ID!): Boolean

    updateAttribute(id: ID!, attribute: UpdateAttributeInput!): AttributePayload
    updateEvent(id: ID!, event: UpdateEventInput!): EventPayload
    updatePerson(id: ID!, sex: Sex!): PersonPayload
    updatePersonName(id: ID!, name: UpdateNameInput!): NamePayload
  }
`;
