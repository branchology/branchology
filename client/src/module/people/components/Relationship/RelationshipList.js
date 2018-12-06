import React from 'react';
import { Link } from 'react-router-dom';
import NoResults from 'component/NoResults';
import { IconButton } from 'module/common/component/Button';
import ChildrenList from './ChildrenList';
import NoRelationshipEvents from './NoRelationshipEvents';
import RelationshipEventList from './RelationshipEventList';

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
            <IconButton icon="plus-circle" success sm>
              Add Event
            </IconButton>
          </div>

          {relationship.events.length ? (
            <RelationshipEventList events={relationship.events} />
          ) : (
            <NoRelationshipEvents />
          )}

          <div className="header">
            <h5 className="sectionTitle" style={{ lineHeight: '1.5em' }}>
              Children
            </h5>
            <IconButton icon="plus-circle" success sm>
              Add Child
            </IconButton>
          </div>

          <ChildrenList children={relationship.children} />
        </div>
      );
    })}
    {relationships.length === 0 && <NoResults />}
  </div>
);
