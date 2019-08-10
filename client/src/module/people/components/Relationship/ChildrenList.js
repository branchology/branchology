import { Button, HTMLTable } from '@blueprintjs/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useToggle } from 'lib';
import { SubHeading } from 'module/common/component/ui';
import AddChild from './AddChild';
import NoChildren from './NoChildren';

export default ({ children, person, relationship }) => {
  const [addOpen, toggleAdd] = useToggle();

  return (
    <div>
      <SubHeading>
        <h4>Children</h4>

        <Button icon="add" intent="success" small minimal onClick={toggleAdd}>
          Add Child
        </Button>
      </SubHeading>

      {addOpen && (
        <AddChild
          person={person}
          relationship={relationship}
          onClose={toggleAdd}
        />
      )}

      {children.length === 0 ? (
        <NoChildren onAction={toggleAdd} />
      ) : (
        <HTMLTable interactive striped>
          <thead>
            <tr>
              <th> </th>
              <th>Given</th>
              <th>Surname</th>
              <th>Lineage</th>
              <th>Birth</th>
              <th>Death</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {children.map(({ id, type, person }) => (
              <tr key={id}>
                <td> </td>
                <td>
                  <Link to={`/people/${person.id}`}>{person.name.given}</Link>
                </td>
                <td>
                  <Link to={`/people/${person.id}`}>{person.name.surname}</Link>
                </td>
                <td>{type}</td>
                <td>{person.birth && person.birth.date}</td>
                <td>{person.death && person.death.date}</td>
                <td> </td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      )}
    </div>
  );
};
