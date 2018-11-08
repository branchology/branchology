import React from 'react';
import { IconButton } from 'module/common/Buttons';
import SimpleDataTable from 'module/common/SimpleDataTable';
import SourceCitationList from './SourceCitationList';

export default ({ events }) => (
  <div>
    <SimpleDataTable>
      <thead>
        <tr>
          <th> </th>
          <th>Attribute</th>
          <th>Date</th>
          <th>Place</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <>
            <tr key={event.id} className={index % 2 === 1 ? 'alt' : ''}>
              <td> </td>
              <td>{event.type}</td>
              <td>{event.date}</td>
              <td>{event.place && event.place.description}</td>
              <td className="actions">
                <IconButton primary icon="pencil" onClick={() => null}>
                  Edit
                </IconButton>
                <IconButton danger icon="trash" onClick={() => null}>
                  Delete
                </IconButton>
              </td>
            </tr>
            <tr className={index % 2 === 1 ? 'alt' : ''}>
              <td className="citations"> </td>
              <td colSpan="5" className="citations">
                <SourceCitationList citations={event.sourceCitations} />
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </SimpleDataTable>
  </div>
);
