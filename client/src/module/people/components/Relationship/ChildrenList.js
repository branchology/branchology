import React from 'react';
import { Link } from 'react-router-dom';
import { useToggle } from 'lib';
import { components } from 'module/common';
import AddChild from './AddChild';
import NoChildren from './NoChildren';

const {
  ui: {
    DataTable: { Cell, Heading, Table },
    IconButton,
  },
  WithUser,
} = components;

export default ({ children, person, relationship }) => {
  const [addOpen, toggleAdd] = useToggle();

  return (
    <div>
      <div className="header">
        <h5 className="sectionTitle" style={{ lineHeight: '1.5em' }}>
          Children
        </h5>
        <WithUser>
          <IconButton icon="plus-circle" success sm onClick={toggleAdd}>
            Add Child
          </IconButton>
        </WithUser>
      </div>

      <WithUser>
        {addOpen && (
          <AddChild
            person={person}
            relationship={relationship}
            onClose={toggleAdd}
          />
        )}
      </WithUser>

      {children.length === 0 ? (
        <NoChildren onAction={toggleAdd} />
      ) : (
        <Table>
          <thead>
            <tr>
              <Heading> </Heading>
              <Heading>Given</Heading>
              <Heading>Surname</Heading>
              <Heading>Lineage</Heading>
              <Heading>Birth</Heading>
              <Heading>Death</Heading>
              <Heading> </Heading>
            </tr>
          </thead>
          <tbody>
            {children.map(({ id, type, person }) => (
              <tr key={id}>
                <Cell> </Cell>
                <Cell>
                  <Link to={`/people/${person.id}`}>{person.name.given}</Link>
                </Cell>
                <Cell>
                  <Link to={`/people/${person.id}`}>{person.name.surname}</Link>
                </Cell>
                <Cell>{type}</Cell>
                <Cell>{person.birth && person.birth.date}</Cell>
                <Cell>{person.death && person.death.date}</Cell>
                <Cell> </Cell>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
