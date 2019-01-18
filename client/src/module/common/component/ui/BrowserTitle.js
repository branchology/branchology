import React from 'react';
import { Helmet } from 'react-helmet';

// TODO: FIXME: Remove hard-coded app name
export const BrowserTitle = ({ title }) => (
  <Helmet>
    <title>{title} - Branchology</title>
  </Helmet>
);
