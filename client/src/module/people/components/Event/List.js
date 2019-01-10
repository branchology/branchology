import React, { useState } from 'react';
import { IconButton } from 'module/common/component/Button';
import SimpleDataTable, { Cell, Heading } from 'module/common/SimpleDataTable';
import WithUser from 'module/common/component/WithUser';
import EventAdd from './Add';
import EventDelete from './Delete';
import EventEdit from './Edit';
import NoPersonEvents from './NoPersonEvents';
import EventPreferredToggle from './PreferredToggle';
import CitationList from './CitationList';

const eventsAllowingPrimary = eventTypes =>
  Object.keys(eventTypes).filter(key => eventTypes[key].allowsPrimary);

export default ({ addEvent, events, eventTypes, parent, removeEvent }) => {
  const [editEvent, toggleEdit] = useState();
  const [activeDialog, toggleDialog] = useState();

  return events.length === 0 ? (
    <NoPersonEvents />
  ) : (
    <div>
      <WithUser>
        {editEvent && (
          <EventEdit
            parent={parent}
            event={editEvent}
            eventTypes={eventTypes}
            onClose={() => toggleEdit(null)}
          />
        )}

        {activeDialog === 'EventAdd' && (
          <EventAdd
            addEvent={addEvent}
            parent={parent}
            eventTypes={eventTypes}
            onClose={toggleDialog}
          />
        )}
      </WithUser>

      <SimpleDataTable>
        <thead>
          <tr>
            <Heading> </Heading>
            <Heading>Attribute</Heading>
            <Heading>Date</Heading>
            <Heading>Place</Heading>
            <Heading right>
              <WithUser>
                <IconButton
                  icon="plus-circle"
                  success
                  sm
                  onClick={() => toggleDialog('EventAdd')}
                >
                  Add Event
                </IconButton>
              </WithUser>
            </Heading>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => [
            <tr key={event.id} className={index % 2 === 1 ? 'alt' : ''}>
              <Cell center middle>
                {eventsAllowingPrimary(eventTypes).includes(
                  event.type.toUpperCase(),
                ) && <EventPreferredToggle event={event} />}
              </Cell>
              <Cell>{event.type}</Cell>
              <Cell>{event.date}</Cell>
              <Cell>{event.place && event.place.description}</Cell>
              <Cell className="actions">
                <WithUser>
                  <IconButton
                    primary
                    icon="pencil"
                    onClick={() => toggleEdit(event)}
                  >
                    Edit
                  </IconButton>
                  <EventDelete
                    parent={parent}
                    data={event}
                    removeEvent={removeEvent}
                  />
                </WithUser>
              </Cell>
            </tr>,
            <tr
              key={`sources-${event.id}`}
              className={index % 2 === 1 ? 'alt' : ''}
            >
              <Cell className="citations"> </Cell>
              <Cell colSpan="5" className="citations">
                <CitationList
                  citations={event.sourceCitations}
                  entity={event}
                />
              </Cell>
            </tr>,
          ])}
        </tbody>
      </SimpleDataTable>
    </div>
  );
};
