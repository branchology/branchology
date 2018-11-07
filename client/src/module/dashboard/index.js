import React from 'react';
import { Route } from 'react-router-dom';

export const indexRoute = () => (
  <Route exact path="/" component={() => <h2>Hello Dashboard</h2>} />
);
