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
        {events.map(event => (
          <>
            <tr key={event.id}>
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
            <tr>
              <td colSpan="6">
                <SourceCitationList citations={event.sourceCitations} />
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </SimpleDataTable>
  </div>
);
