import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  ApolloNetworkStatusProvider,
  useApolloNetworkStatus,
} from 'react-apollo-network-status';
import { LoadingGraphic } from 'module/common/component/ui/LoadingGraphic';
import config from './config';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

function GlobalLoadingIndicator() {
  const status = useApolloNetworkStatus();

  if (status.numPendingQueries > 0) {
    return <LoadingGraphic />;
  } else {
    return null;
  }
}

const client = new ApolloClient({
  link: createHttpLink({
    uri: config.ApiUrl,
  }),
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <ApolloNetworkStatusProvider>
      <GlobalLoadingIndicator />
      <Router />
    </ApolloNetworkStatusProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
