import React from 'react';
import { Link } from 'react-router-dom';
import SimpleDataTable from 'module/common/SimpleDataTable';

export default ({ children }) => (
  <div>
    <SimpleDataTable>
      <thead>
        <tr>
          <th> </th>
          <th>Given</th>
          <th>Surname</th>
          <th>Birth</th>
          <th>Death</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {children.map(({ id, person }) => (
          <>
            <tr key={id}>
              <td> </td>
              <td>
                <Link to={`/people/${person.id}`}>{person.name.given}</Link>
              </td>
              <td>
                <Link to={`/people/${person.id}`}>{person.name.surname}</Link>
              </td>
              <td>{person.birth && person.birth.date}</td>
              <td>{person.death && person.death.date}</td>
              <td> </td>
            </tr>
          </>
        ))}
      </tbody>
    </SimpleDataTable>
  </div>
);
