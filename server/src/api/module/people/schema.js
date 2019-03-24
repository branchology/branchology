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
    person: Person
  }

  type NamePayload {
    errors: [ErrorDetails]
    name: Name
    person: Person
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

  type RemovePersonRecordPayload {
    errors: [ErrorDetails]
    removed: Boolean
    person: Person
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
    addPersonAttribute(
      personId: ID!,
      attribute: CreateAttributeInput!,
      citations: [CreateSourceCitationInput]
    ): AttributePayload @protected

    addPersonAttributeCitation(
      attributeId: ID!,
      citation: CreateSourceCitationInput!
    ): AttributePayload @protected

    addPersonCitation(
      personId: ID!,
      citation: CreateSourceCitationInput!
    ): PersonPayload @protected

    addPersonEvent(
      personId: ID!,
      event: CreateEventInput!,
      citations: [CreateSourceCitationInput]
    ): EventPayload @protected

    addPersonEventCitation(
      eventId: ID!,
      citation: CreateSourceCitationInput!
    ): EventPayload @protected

    addPersonName(
      personId: ID!,
      name: CreateNameInput!,
      citations: [CreateSourceCitationInput]
    ): NamePayload @protected

    addPersonNameCitation(
      nameId: ID!,
      citation: CreateSourceCitationInput!
    ): NamePayload @protected

    createPerson(
      name: CreateNameInput!,
      birth: CreateEventInput,
      death: CreateEventInput,
      sex: Sex!
    ): PersonPayload @protected

    makePersonEventPreferred(eventId: ID!): PrimaryPersonEventPayload @protected
    makePersonNamePreferred(personNameId: ID!): PrimaryPersonNamePayload @protected

    removePerson(personId: ID): Boolean @protected
    removePersonAttribute(attributeId: ID!): RemoveRecordPayload! @protected

    removePersonAttributeCitation(
      attributeId: ID!,
      citationId: ID!
    ): AttributePayload! @protected

    removePersonCitation(citationId: ID!): Boolean @protected
    removePersonEvent(eventId: ID!): RemovePersonRecordPayload! @protected

    removePersonEventCitation(
      eventId: ID!,
      citationId: ID!
    ): EventPayload! @protected

    removePersonName(personNameId: ID): RemovePersonRecordPayload! @protected

    removePersonNameCitation(
      nameId: ID!,
      citationId: ID!
    ): NamePayload @protected

    updateAttribute(
      id: ID!,
      attribute: UpdateAttributeInput!
    ): AttributePayload @protected

    updateEvent(
      id: ID!,
      event: UpdateEventInput!
    ): EventPayload @protected

    updatePerson(
      id: ID!, 
      sex: Sex!
    ): PersonPayload @protected

    updatePersonName(
      id: ID!,
      name: UpdateNameInput!
    ): NamePayload @protected
  }
`;
