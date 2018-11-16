import React, { useState } from 'react';
import { IconButton } from 'module/common/Buttons';
import SimpleDataTable, { Cell } from 'module/common/SimpleDataTable';
import NameDelete from './NameDelete';
import NameEdit from './NameEdit';
import PreferredRecord from './PreferredRecord';
import SourceCitationList from './SourceCitationList';

export default function NameList({ names, person }) {
  const [editName, toggleEdit] = useState();

  return (
    <div>
      {editName && (
        <NameEdit name={editName} onClose={() => toggleEdit(null)} />
      )}
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
              <Cell center middle>
                <PreferredRecord isPreferred={name.isPreferred} />
              </Cell>
              <Cell>{name.prefix}</Cell>
              <Cell>{name.given}</Cell>
              <Cell>{name.surname}</Cell>
              <Cell>{name.suffix}</Cell>
              <Cell className="actions">
                <IconButton
                  primary
                  icon="pencil"
                  onClick={() => toggleEdit(name)}
                >
                  Edit
                </IconButton>
                <NameDelete person={person} name={name} />
              </Cell>
            </tr>,
            <tr key={`sources-${name.id}`}>
              <Cell colSpan="3">
                <SourceCitationList citations={name.sourceCitations} />
              </Cell>
            </tr>,
          ])}
        </tbody>
      </SimpleDataTable>
    </div>
  );
}
