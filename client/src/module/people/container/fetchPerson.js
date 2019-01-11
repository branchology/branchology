import React from 'react';
import { Query } from 'module/common';
import fetchPersonQuery from '../query/fetchPerson';

export default WrappedComponent => props => (
  <Query query={fetchPersonQuery} variables={{ id: props.id }}>
    {({ loading, data }) => {
      if (loading) return null;
      return <WrappedComponent data={data} />;
    }}
  </Query>
);
