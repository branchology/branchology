export default `
  type User {
    id: ID!
    name: String
    email: String!
  }

  type Token {
    id: ID!
    token: String!
    expires: DateTime!
    user: User!
  }

  type TokenPayload {
    token: Token
    errors: JSON
  }

  extend type Mutation {
    createToken(email: String!, password: String): TokenPayload
  }
`;
