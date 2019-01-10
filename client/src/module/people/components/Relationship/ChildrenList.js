import React from 'react';
import { Link } from 'react-router-dom';
import { useToggle } from 'lib';
import { IconButton } from 'module/common/component/Button';
import SimpleDataTable, { Cell, Heading } from 'module/common/SimpleDataTable';
import AddChild from './AddChild';
import NoChildren from './NoChildren';

export default ({ children, person, relationship }) => {
  const [addOpen, toggleAdd] = useToggle();

  return (
    <div>
      <div className="header">
        <h5 className="sectionTitle" style={{ lineHeight: '1.5em' }}>
          Children
        </h5>
        <IconButton icon="plus-circle" success sm onClick={toggleAdd}>
          Add Child
        </IconButton>
      </div>

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
        <SimpleDataTable>
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
        </SimpleDataTable>
      )}
    </div>
  );
};
