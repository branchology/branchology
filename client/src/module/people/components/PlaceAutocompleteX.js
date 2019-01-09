import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { AutoComplete } from 'module/common/component/FormX';

// TODO: FIXME: Shoudl we extract this into a wrapper/container?
const searchPlace = gql`
  query fetchPlaces(
    $search: String
    $sorting: [SortingInput]
    $paging: PagingInput
  ) {
    search: places(search: $search, sorting: $sorting, paging: $paging) {
      values: items {
        id
        value: description
      }
    }
  }
`;

export default ({ hardValues = [], name, ...props }) => {
  const [search, onSearch] = useState('');

  return (
    <Query
      query={searchPlace}
      variables={{
        search,
        sorting: [{ field: 'description', order: 'ASC' }],
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
