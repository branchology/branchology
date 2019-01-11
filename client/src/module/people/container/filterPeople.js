import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'module/common';

const filterPeople = gql`
  query filterPeople($filter: PersonFilter) {
    people(filter: $filter, paging: { perPage: 25 }) {
      items {
        id
        name {
          id
          given
          surname
        }
        birth {
          date
        }
        death {
          date
        }
      }
    }
  }
`;

export default WrappedComponent => ({ search: nameContains, ...props }) => (
  <Query query={filterPeople} variables={{ filter: { nameContains } }}>
    {({ loading, data }) => {
      if (loading) return null;
      return <WrappedComponent data={data} {...props} />;
    }}
  </Query>
);
