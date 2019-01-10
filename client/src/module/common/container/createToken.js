import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';

const createTokenMutation = gql`
  mutation createToken($email: String!, $password: String!) {
    createToken(email: $email, password: $password) {
      errors
      token {
        id
        token
        expires
        user {
          id
          email
        }
      }
    }
  }
`;

export default WrappedComponent => props => (
  <Mutation mutation={createTokenMutation}>
    {createToken => (
      <WrappedComponent
        createToken={variables => createToken({ variables })}
        {...props}
      />
    )}
  </Mutation>
);
