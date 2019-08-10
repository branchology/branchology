import { Button, Card } from '@blueprintjs/core';
import React from 'react';
import { useToggle } from 'lib';
import { SubHeading, TabContainer } from 'module/common/component/ui';
import AddRelationship from './AddRelationship';
import NoRelationships from './NoRelationships';
import ChildrenList from './ChildrenList';
import EventList from './EventList';
import eventTypes from './eventTypes';

export default ({ person }) => {
  const [addOpen, toggleAdd] = useToggle();

  return (
    <>
      {addOpen && <AddRelationship person={person} onClose={toggleAdd} />}
      <h3>Relationships</h3>

      {person.relationships.length ? (
        <TabContainer
          action={
            <Button
              icon="add"
              intent="success"
              small
              minimal
              onClick={toggleAdd}
            >
              Add Relationship
            </Button>
          }
          tabs={person.relationships.map(relationship => {
            const spouse = relationship.people.find(p => p.id !== person.id);
            return {
              label: `${spouse.name.given} ${spouse.name.surname}`,
              count: relationship.children.length,
            };
          })}
          contents={person.relationships.map(relationship => {
            return (
              <>
                <SubHeading>
                  <h4>Events</h4>
                </SubHeading>

                <EventList
                  type="relationship"
                  person={person}
                  parent={relationship}
                  events={relationship.events}
                  eventTypes={eventTypes}
                />

                <ChildrenList
                  person={person}
                  relationship={relationship}
                  children={relationship.children}
                />
              </>
            );
          })}
        />
      ) : (
        <Card elevation={1}>
          <NoRelationships />
        </Card>
      )}
    </>
  );
};
