import React from 'react';
import { Route } from 'react-router-dom';

const AsyncIndex = React.lazy(() => import('./page/IndexPage'));

export const indexRoute = () => <Route path="/places" component={AsyncIndex} />;
