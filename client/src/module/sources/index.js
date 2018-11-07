import React from 'react';
import { Route } from 'react-router-dom';
import makeAsyncModuleLoader from 'lib/makeAsyncModuleLoader';

const AsyncIndex = makeAsyncModuleLoader({
  loader: () => import('./page/IndexPage'),
});

export const indexRoute = () => (
  <Route path="/sources" component={AsyncIndex} />
);
