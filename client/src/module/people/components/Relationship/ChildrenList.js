import React from 'react';
import { Link } from 'react-router-dom';
import SimpleDataTable, { Cell, Heading } from 'module/common/SimpleDataTable';

export default ({ children }) => (
  <div>
    <SimpleDataTable>
      <thead>
        <tr>
          <Heading> </Heading>
          <Heading>Given</Heading>
          <Heading>Surname</Heading>
          <Heading>Birth</Heading>
          <Heading>Death</Heading>
          <Heading> </Heading>
        </tr>
      </thead>
      <tbody>
        {children.map(({ id, person }) => (
          <tr key={id}>
            <Cell> </Cell>
            <Cell>
              <Link to={`/people/${person.id}`}>{person.name.given}</Link>
            </Cell>
            <Cell>
              <Link to={`/people/${person.id}`}>{person.name.surname}</Link>
            </Cell>
            <Cell>{person.birth && person.birth.date}</Cell>
            <Cell>{person.death && person.death.date}</Cell>
            <Cell> </Cell>
          </tr>
        ))}
      </tbody>
    </SimpleDataTable>
  </div>
);
