import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { AutoComplete } from 'module/common/component/Form';

// TODO: FIXME: Shoudl we extract this into a wrapper/container?
const searchSources = gql`
  query fetchSources(
    $search: String
    $sorting: [SortingInput]
    $paging: PagingInput
  ) {
    sources(search: $search, sorting: $sorting, paging: $paging) {
      items {
        id
        title
      }
    }
  }
`;

function mapData(sources) {
  return sources.map(s => ({
    id: s.id,
    label: s.title,
  }));
}

export default ({ container, ...props }) => {
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
      {({ loading, error, data }) => {
        return (
          <AutoComplete
            {...props}
            container={container}
            values={mapData(loading ? [] : data.sources.items)}
            onSearch={onSearch}
            onChange={e => {
              onSearch(e.target.value);
              container.mergeState({
                __source__: e.target.value,
                source: e.target.value,
                sourceId: null,
              });
            }}
            onSelect={(value, item) =>
              container.mergeState({
                sourceId: item.id,
                __source__: value,
                source: null,
              })
            }
            value={container.getValue('__source__')}
          />
        );
      }}
    </Query>
  );
};
