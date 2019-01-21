import React from 'react';
import { Link } from 'react-router-dom';
import { components } from 'module/common';
import filterPeople from '../container/filterPeople';

const {
  ui: {
    DataTable: { Cell, Heading, Table },
  },
} = components;

const PeopleList = ({ data }) => (
  <Table>
    <thead>
      <tr>
        <Heading>Surname</Heading>
        <Heading>Given Name</Heading>
        <Heading>Born</Heading>
        <Heading>Died</Heading>
      </tr>
    </thead>
    <tbody>
      {data.people.items.map((person, index) => (
        <tr key={person.id} className={index % 2 === 1 ? 'alt' : ''}>
          <Cell>
            <Link to={`/people/${person.id}`}>{person.name.surname}</Link>
          </Cell>
          <Cell>
            <Link to={`/people/${person.id}`}>{person.name.given}</Link>
          </Cell>
          <Cell>{person.birth && person.birth.date}</Cell>
          <Cell>{person.death && person.death.date}</Cell>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default filterPeople(PeopleList);
