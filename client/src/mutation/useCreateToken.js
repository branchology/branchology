import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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

export function useCreateToken() {
  const [createToken, other] = useMutation(createTokenMutation);

  const fn = ({ email, password }) =>
    createToken({ variables: { email, password } }).then(data =>
      'createToken' in data.data
        ? {
            token: data.data.createToken.token,
            errors: data.data.createToken.errors,
          }
        : data,
    );

  return [fn, other];
}
