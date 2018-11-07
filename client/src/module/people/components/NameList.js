import React, { useState } from 'react';
import NameEdit from './NameEdit';
import SourceCitationList from './SourceCitationList';
import Icon from 'module/common/Icon';
import { IconButton } from 'module/common/Buttons';
import SimpleDataTable from 'module/common/SimpleDataTable';

export default function NameList({ names }) {
  const [editName, toggle] = useState();

  return (
    <div>
      {editName && <NameEdit name={editName} onClose={() => toggle(null)} />}
      <SimpleDataTable>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Prefix</th>
            <th>Given</th>
            <th>Surname</th>
            <th>Suffix</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {names.map(name => [
            <tr key={name.id}>
              <td>
                <Icon icon="key" title="Default/preferred name" />
              </td>
              <td>{name.prefix}</td>
              <td>{name.given}</td>
              <td>{name.surname}</td>
              <td>{name.suffix}</td>
              <td className="actions">
                <IconButton primary icon="pencil" onClick={() => toggle(name)}>
                  Edit
                </IconButton>
                <IconButton danger icon="trash" onClick={() => null}>
                  Delete
                </IconButton>
              </td>
            </tr>,
            <tr>
              <td colSpan="3">
                <SourceCitationList citations={name.sourceCitations} />
              </td>
            </tr>,
          ])}
        </tbody>
      </SimpleDataTable>
    </div>
  );
}
