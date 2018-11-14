import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import SimpleDataTable from 'module/common/SimpleDataTable';

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

const PeopleTable = ({ search: nameContains }) => (
  <Query query={filterPeople} variables={{ filter: { nameContains } }}>
    {({ loading, data }) => {
      if (loading) return null;
      return (
        <SimpleDataTable>
          <thead>
            <tr>
              <th>Surname</th>
              <th>Given Name</th>
              <th>Born</th>
              <th>Died</th>
            </tr>
          </thead>
          <tbody>
            {data.people.items.map(person => (
              <tr key={person.id}>
                <td>
                  <Link to={`/people/${person.id}`}>{person.name.surname}</Link>
                </td>
                <td>
                  <Link to={`/people/${person.id}`}>{person.name.given}</Link>
                </td>
                <td>{person.birth && person.birth.date}</td>
                <td>{person.death && person.death.date}</td>
              </tr>
            ))}
          </tbody>
        </SimpleDataTable>
      );
    }}
  </Query>
);

export default () => {
  const [search, setSearch] = useState();

  const debouncedSearch = debounce(500, setSearch);

  const onSearch = e => {
    console.log({ search, v: e.target.value });
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <h2>PEOPLE!</h2>
      <input type="text" name="search" onChange={onSearch} />
      <PeopleTable search={search} />
    </div>
  );
};
