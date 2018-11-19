import React from 'react';
import { IconButton } from 'module/common/Buttons';
import SimpleDataTable, { Cell, Heading } from 'module/common/SimpleDataTable';
import NoRelationshipEvents from './NoRelationshipEvents';
import PreferredRecord from './PreferredRecord';
import SourceCitationList from './SourceCitationList';

const eventsAllowingPrimary = [
  'birt',
  'chr',
  'deat',
  'buri',
  'crem',
  'bapm',
  'barm',
  'basm',
  'bles',
  'chra',
  'conf',
  'natu',
  'emig',
  'immi',
  'marr',
  'div',
  'anul',
  'divf',
];

export default ({ events }) =>
  events.length === 0 ? (
    <NoRelationshipEvents />
  ) : (
    <div>
      <SimpleDataTable>
        <thead>
          <tr>
            <Heading> </Heading>
            <Heading>Attribute</Heading>
            <Heading>Date</Heading>
            <Heading>Place</Heading>
            <Heading> </Heading>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => [
            <tr key={event.id} className={index % 2 === 1 ? 'alt' : ''}>
              <Cell>
                {eventsAllowingPrimary.includes(event.type.toLowerCase()) && (
                  <PreferredRecord isPreferred={event.isPreferred} />
                )}
              </Cell>
              <Cell>{event.type}</Cell>
              <Cell>{event.date}</Cell>
              <Cell>{event.place && event.place.description}</Cell>
              <Cell className="actions">
                <IconButton primary icon="pencil" onClick={() => null}>
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
