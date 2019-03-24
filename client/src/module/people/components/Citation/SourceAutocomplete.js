import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { components } from 'module/common';

const {
  ui: {
    Form: { AutoComplete },
  },
} = components;

// TODO: FIXME: Shoudl we extract this into a wrapper/container?
const searchSources = gql`
  query fetchSources(
    $search: String
    $sorting: [SortingInput]
    $paging: PagingInput
  ) {
    search: sources(search: $search, sorting: $sorting, paging: $paging) {
      values: items {
        id
        value: title
      }
    }
  }
`;

export default ({ hardValues = [], name, ...props }) => {
  const [search, onSearch] = useState('');

  return (
    <Query
      query={searchSources}
      variables={{
        search,
        sorting: [{ field: 'title', order: 'ASC' }],
        paging: { page: 1, perPage: 20 },
      }}
    >
      {({ loading, data }) => {
        const values = loading ? [] : [...data.search.values, ...hardValues];
        return (
          <AutoComplete
            {...props}
            name={name}
            onSearch={onSearch}
            values={values}
          />
        );
      }}
    </Query>
  );
};
