import React from 'react';
import { UserContext } from '../../../UserContext';

export const WithUser = ({ children }) => (
  <UserContext.Consumer>{props => children(props)}</UserContext.Consumer>
);
