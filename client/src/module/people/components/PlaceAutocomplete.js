import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { AutoComplete } from 'module/common/component/Form';

// TODO: FIXME: Shoudl we extract this into a wrapper/container?
const searchPlace = gql`
  query fetchPlaces(
    $search: String
    $sorting: [SortingInput]
    $paging: PagingInput
  ) {
    places(search: $search, sorting: $sorting, paging: $paging) {
      items {
        id
        description
      }
    }
  }
`;

function mapData(places) {
  return places.map(place => ({
    id: place.id,
    label: place.description,
  }));
}

export default ({ container, hardValues = [], name, ...props }) => {
  const [search, onSearch] = useState('');

  const passedValue = container.getValue('__place__') || '';

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
        return (
          <AutoComplete
            {...props}
            name={name}
            container={container}
            values={mapData(
              loading ? [] : [...data.places.items, ...hardValues],
            )}
            onChange={e => {
              onSearch(e.target.value);
              container.mergeState({
                __place__: e.target.value,
                place: e.target.value,
                placeId: null,
              });
            }}
            onSelect={(value, item) =>
              container.mergeState({
                placeId: item.id,
                __place__: value,
                place: null,
              })
            }
            value={passedValue}
          />
        );
      }}
    </Query>
  );
};
