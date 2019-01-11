import React from 'react';
import { Mutation as BaseMutation } from 'react-apollo';
import { getApolloContext } from 'lib';

export const Mutation = ({ children, ...props }) => (
  <BaseMutation {...props} context={getApolloContext()}>
    {children}
  </BaseMutation>
);
