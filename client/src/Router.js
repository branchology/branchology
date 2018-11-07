import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AppLayout from 'layout/App';
import { indexRoute as DashboardRoute } from 'module/dashboard';
import {
  detailsRoute as PeopleDetailsRoute,
  indexRoute as PeopleIndexRoute,
} from 'module/people';
import { indexRoute as PlacesIndexRoute } from 'module/places';
import { indexRoute as SourcesIndexRoute } from 'module/sources';

const Router = () => (
  <BrowserRouter>
    <AppLayout>
      <Switch>
        {DashboardRoute()}
        {PeopleIndexRoute()}
        {PeopleDetailsRoute()}
        {PlacesIndexRoute()}
        {SourcesIndexRoute()}
      </Switch>
    </AppLayout>
  </BrowserRouter>
);

export default Router;
