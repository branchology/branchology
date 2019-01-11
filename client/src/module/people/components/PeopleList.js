import React from 'react';
import { Link } from 'react-router-dom';
import SimpleDataTable from 'module/common/SimpleDataTable';
import filterPeople from '../container/filterPeople';

const PeopleList = ({ data }) => (
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

export default filterPeople(PeopleList);
