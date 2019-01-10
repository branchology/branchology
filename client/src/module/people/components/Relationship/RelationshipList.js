import React from 'react';
import { Link } from 'react-router-dom';
import NoResults from 'component/NoResults';
import { IconButton } from 'module/common/component/Button';
import ChildrenList from './ChildrenList';
import EventList from './EventList';
import eventTypes from './eventTypes';
import NoRelationshipEvents from './NoRelationshipEvents';

export default ({ person, relationships }) => (
  <div>
    {relationships.map(relationship => {
      const spouse = relationship.people.find(p => p.id !== person.id);

      return (
        <div key={relationship.id}>
          {spouse ? (
            <h4>
              <Link to={`/people/${spouse.id}`}>
                {spouse.name.given} {spouse.name.surname}
              </Link>
            </h4>
          ) : (
            <h4>Unknown</h4>
          )}

          <div className="header">
            <h5 className="sectionTitle padTop">Events</h5>
          </div>

          {relationship.events.length ? (
            <EventList
              person={person}
              parent={relationship}
              events={relationship.events}
              eventTypes={eventTypes}
            />
          ) : (
            <NoRelationshipEvents />
          )}

          <ChildrenList
            person={person}
            relationship={relationship}
            children={relationship.children}
          />
        </div>
      );
    })}
    {relationships.length === 0 && <NoResults />}
  </div>
);
