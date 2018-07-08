export default `
  enum LineageType {
    ADOPTED
    BIRTH
    FOSTER
    SEALING
  }

  enum RelationshipEventType {
    ANUL
    ENGA
    DIV
    DIVF
    MARL
    MARR
  }

  type RelationshipEvent {
    id: ID!
    type: RelationshipEventType!
    date: String
    place: Place
    sourceCitations: [SourceCitation]
    notes: [Note]
  }

  type Relationship {
    id: ID!
    people: [Person]
    events: [RelationshipEvent]
    marriage: RelationshipEvent
    children: [Person]
  }

  type Parents {
    id: ID!
    type: LineageType!
    relationship: Relationship!
  }
`;
