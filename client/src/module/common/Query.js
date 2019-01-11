import React from 'react';
import { Query as BaseQuery } from 'react-apollo';
import { getApolloContext } from 'lib';

export const Query = ({ children, ...props }) => (
  <BaseQuery {...props} context={getApolloContext()}>
    {children}
  </BaseQuery>
);
