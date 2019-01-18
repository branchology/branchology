import React from 'react';
import { AppContext } from '../Context';

export const WithUser = ({ children, otherwise }) => (
  <AppContext.Consumer>
    {({ isAuthenticated, logout, user }) =>
      isAuthenticated()
        ? typeof children === 'function'
          ? children({ logout, user })
          : children
        : otherwise
    }
  </AppContext.Consumer>
);
