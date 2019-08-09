import React from 'react';
import { Route } from 'react-router-dom';

const AsyncIndex = React.lazy(() => import('./page/IndexPage'));
const AsyncDetails = React.lazy(() => import('./page/DetailsPage'));

const detailsRoute = () => (
  <Route path="/people/:id" component={AsyncDetails} />
);

const indexRoute = () => <Route path="/people" exact component={AsyncIndex} />;

export { detailsRoute, indexRoute };
