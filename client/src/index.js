import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';
import { render } from 'react-dom';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';
import LoadingGraphic from 'module/common/LoadingGraphic';

const {
  NetworkStatusNotifier,
  link: networkStatusNotifierLink,
} = createNetworkStatusNotifier();

const client = new ApolloClient({
  link: networkStatusNotifierLink.concat(
    createHttpLink({
      uri: 'http://localhost:4000/graphql',
    }),
  ),
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <NetworkStatusNotifier
      render={({ loading }) => loading && <LoadingGraphic />}
    />
    <Router />
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();