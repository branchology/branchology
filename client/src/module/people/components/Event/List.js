import { Button, ButtonGroup, Divider, HTMLTable } from '@blueprintjs/core';
import React, { useState } from 'react';
import { components } from 'module/common';
import EventAdd from './Add';
import EventDelete from './Delete';
import EventEdit from './Edit';
import NoEvents from './NoEvents';
import EventPreferredToggle from './PreferredToggle';
import CitationList from './CitationList';

const {
  ui: { Dialog },
} = components;

const eventsAllowingPrimary = eventTypes =>
  Object.keys(eventTypes).filter(key => eventTypes[key].allowsPrimary);

function CitationsDialog({ citations, entity, onClose }) {
  return (
    <Dialog
      title="Manage Citations"
      onClose={onClose}
      footer={
        <div>
          <Button intent="danger" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <CitationList citations={citations} entity={entity} />
    </Dialog>
  );
}

export default ({
  addEvent,
  events,
  eventTypes,
  parent,
  removeEvent,
  type,
}) => {
  const [editEvent, toggleEdit] = useState();
  const [activeDialog, toggleDialog] = useState();
  const [citationsEvent, setCitationsEvent] = useState();

  return (
    <div>
      {citationsEvent && (
        <CitationsDialog
          entity={citationsEvent}
          citations={citationsEvent.sourceCitations}
          onClose={() => setCitationsEvent(null)}
        />
      )}

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

      {events.length === 0 && (
        <NoEvents type={type} onAddClick={() => toggleDialog('EventAdd')} />
      )}

      {events.length > 0 && (
        <HTMLTable interactive striped>
          <thead>
            <tr>
              <th> </th>
              <th>Attribute</th>
              <th>Date</th>
              <th>Place</th>
              <th className="right">
                <Button
                  icon="add"
                  intent="success"
                  small
                  minimal
                  onClick={() => toggleDialog('EventAdd')}
                >
                  Add Event
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id} className={index % 2 === 1 ? 'alt' : ''}>
                <td className="center middle">
                  {eventsAllowingPrimary(eventTypes).includes(
                    event.type.toUpperCase(),
                  ) && <EventPreferredToggle event={event} />}
                </td>
                <td>{event.type}</td>
                <td>{event.date}</td>
                <td>{event.place && event.place.description}</td>
                <td className="right">
                  <ButtonGroup>
                    <Button
                      intent="primary"
                      icon="book"
                      minimal
                      small
                      onClick={() => setCitationsEvent(event)}
                    >
                      {event.sourceCitations.length}
                    </Button>
                    <Divider />
                    <Button
                      intent="primary"
                      icon="edit"
                      minimal
                      small
                      onClick={() => toggleEdit(event)}
                    />
                    <Divider />
                    <EventDelete
                      parent={parent}
                      data={event}
                      removeEvent={removeEvent}
                    />
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      )}
    </div>
  );
};

/*<tr
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
              </tr>
            */
