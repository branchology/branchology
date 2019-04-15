export default `
  enum LineageType {
    ADOPTED
    BIRTH
    FOSTER
    SEALING
  }

  type Parents {
    id: ID!
    type: LineageType!
    relationship: Relationship
  }

  type Child {
    id: ID!
    type: LineageType!
    person: Person
  }

  type Relationship {
    id: ID!
    people: [Person]
    events: [Event]
    marriage: Event
    children: [Child]
  }

  type RelationshipPayload {
    error: JSON
    relationship: Relationship
  }

  type CreateChildPayload {
    errors: [ErrorDetails]
    relationship: Relationship
  }

  type CreateSpousePayload {
    errors: [ErrorDetails]
    relationship: Relationship
    person: Person
  }

  type ParentsPayload {
    error: ErrorDetails
    parents: Parents
  }

  input ParentInput {
    name: NameInput!
    birth: EventInput
    death: EventInput
    sex: Sex!
  }

  type RelationshipEventPayload {
    errors: [ErrorDetails]
    event: Event
    relationship: Relationship
  }

  type RemoveRelationshipEventPayload {
    errors: [ErrorDetails]
    removed: Boolean
    relationship: Relationship
  }

  extend type Mutation {
    createChild(
      relationshipId: ID!,
      name: NameInput!,
      lineage: LineageType = BIRTH,
      birth: EventInput,
      death: EventInput,
      sex: Sex!,
      citations: [CreateSourceCitationInput]
    ): CreateChildPayload @protected

    createParents(
      personId: ID!,
      parents: [ParentInput]!,
      lineage: LineageType!
    ): ParentsPayload @protected

    createSpouse(
      personId: ID!,
      sex: Sex!,
      name: NameInput!,
      birth: EventInput,
      death: EventInput,
      marriage: EventInput,
      citations: [CreateSourceCitationInput]
    ): CreateSpousePayload @protected

    addRelationshipEvent(
      relationshipId: ID!,
      event: CreateEventInput!,
      citations: [CreateSourceCitationInput]
    ): RelationshipEventPayload @protected

    removeRelationshipEvent(eventId: ID!): RemoveRelationshipEventPayload! @protected
  }
`;
