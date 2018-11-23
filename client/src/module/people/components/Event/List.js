import React, { useState } from 'react';
import { IconButton } from 'module/common/component/Button';
import SimpleDataTable, { Cell, Heading } from 'module/common/SimpleDataTable';
import EventAdd from './Add';
import EventEdit from './Edit';
import NoPersonEvents from './NoPersonEvents';
import eventTypes from './config';
import PreferredRecord from '../PreferredRecord';
import SourceCitationList from '../SourceCitationList';

const eventsAllowingPrimary = Object.keys(eventTypes).filter(
  key => eventTypes[key].allowsPrimary,
);

export default ({ person, events }) => {
  const [editEvent, toggleEdit] = useState();
  const [activeDialog, toggleDialog] = useState();

  return events.length === 0 ? (
    <NoPersonEvents />
  ) : (
    <div>
      {editEvent && (
        <EventEdit
          person={person}
          event={editEvent}
          onClose={() => toggleEdit(null)}
        />
      )}

      {activeDialog === 'EventAdd' && (
        <EventAdd person={person} onClose={toggleDialog} />
      )}

      <SimpleDataTable>
        <thead>
          <tr>
            <Heading> </Heading>
            <Heading>Attribute</Heading>
            <Heading>Date</Heading>
            <Heading>Place</Heading>
            <Heading right>
              <IconButton
                icon="plus-circle"
                success
                sm
                onClick={() => toggleDialog('EventAdd')}
              >
                Add Event
              </IconButton>
            </Heading>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => [
            <tr key={event.id} className={index % 2 === 1 ? 'alt' : ''}>
              <Cell>
                {eventsAllowingPrimary.includes(event.type.toUpperCase()) && (
                  <PreferredRecord isPreferred={event.isPreferred} />
                )}
              </Cell>
              <Cell>{event.type}</Cell>
              <Cell>{event.date}</Cell>
              <Cell>{event.place && event.place.description}</Cell>
              <Cell className="actions">
                <IconButton
                  primary
                  icon="pencil"
                  onClick={() => toggleEdit(event)}
                >
                  Edit
                </IconButton>
                <IconButton danger icon="trash" onClick={() => null}>
                  Delete
                </IconButton>
              </Cell>
            </tr>,
            <tr
              key={`sources-${event.id}`}
              className={index % 2 === 1 ? 'alt' : ''}
            >
              <Cell className="citations"> </Cell>
              <Cell colSpan="5" className="citations">
                <SourceCitationList citations={event.sourceCitations} />
              </Cell>
            </tr>,
          ])}
        </tbody>
      </SimpleDataTable>
    </div>
  );
};
