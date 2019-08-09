import { HTMLTable } from '@blueprintjs/core';
import React from 'react';
import { Link } from 'react-router-dom';
import filterPeople from '../container/filterPeople';

const PeopleList = ({ data }) => (
  <HTMLTable interactive striped style={{ width: '100%' }}>
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
        <tr>
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
  </HTMLTable>
);

export default filterPeople(PeopleList);
