import React from 'react';
import { Link } from 'react-router-dom';
import { components } from 'module/common';
import filterPeople from '../container/filterPeople';

const {
  ui: {
    DataTable: { Table },
  },
} = components;

const PeopleList = ({ data }) => (
  <Table>
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
  </Table>
);

export default filterPeople(PeopleList);
