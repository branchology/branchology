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

  extend type Mutation {
    createChild(relationshipId: ID!, name: NameInput!, birth: EventInput, death: EventInput, sex: Sex!): PersonPayload
    createParents(personId: ID!, parents: [ParentInput]!, lineage: LineageType, citations: [CreateSourceCitationInput]): ParentsPayload
    createSpouse(personId:  ID!, name: NameInput!, birth: EventInput, death: EventInput, sex: Sex!): RelationshipPayload
  }
`;
