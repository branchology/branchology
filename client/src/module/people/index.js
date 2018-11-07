import React from 'react';
import { Route } from 'react-router-dom';
import makeAsyncModuleLoader from 'lib/makeAsyncModuleLoader';

const AsyncDetails = makeAsyncModuleLoader({
  loader: () => import('./page/DetailsPage'),
});

const AsyncIndex = makeAsyncModuleLoader({
  loader: () => import('./page/IndexPage'),
});

const detailsRoute = () => (
  <Route path="/people/:id" component={AsyncDetails} />
);

const indexRoute = () => <Route path="/people" exact component={AsyncIndex} />;

export { detailsRoute, indexRoute };
