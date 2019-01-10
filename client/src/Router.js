import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import App from 'module/common/App';
import { indexRoute as DashboardRoute } from 'module/dashboard';
import {
  detailsRoute as PeopleDetailsRoute,
  indexRoute as PeopleIndexRoute,
} from 'module/people';
import { indexRoute as PlacesIndexRoute } from 'module/places';
import { indexRoute as SourcesIndexRoute } from 'module/sources';

const Router = () => (
  <BrowserRouter>
    <App>
      <Switch>
        {DashboardRoute()}
        {PeopleIndexRoute()}
        {PeopleDetailsRoute()}
        {PlacesIndexRoute()}
        {SourcesIndexRoute()}
      </Switch>
    </App>
  </BrowserRouter>
);

export default Router;
