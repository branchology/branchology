export default `
  enum LineageType {
    ADOPTED
    BIRTH
    FOSTER
    SEALING
  }

  type Relationship {
    id: ID!
    people: [Person]
    events: [Event]
    marriage: Event
    children: [Person]
  }

  type Parents {
    id: ID!
    type: LineageType!
    relationship: Relationship!
  }
`;
