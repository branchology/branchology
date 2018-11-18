import React, { useState } from 'react';
import { IconButton } from 'module/common/Buttons';
import SimpleDataTable, { Cell, Heading } from 'module/common/SimpleDataTable';
import NameDelete from './NameDelete';
import NameEdit from './NameEdit';
import NamePreferredToggle from './NamePreferredToggle';
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
            <Heading>&nbsp;</Heading>
            <Heading>Prefix</Heading>
            <Heading>Given</Heading>
            <Heading>Surname</Heading>
            <Heading>Suffix</Heading>
            <Heading as="th" right>&nbsp;</Heading>
          </tr>
        </thead>
        <tbody>
          {names.map(name => [
            <tr key={name.id}>
              <Cell center middle>
                <NamePreferredToggle name={name} />
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
