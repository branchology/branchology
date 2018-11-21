import React, { useState } from 'react';
import { IconButton } from 'module/common/component/Button';
import SimpleDataTable, { Cell, Heading } from 'module/common/SimpleDataTable';
import NameAdd from './Add';
import NameDelete from './Delete';
import NameEdit from './Edit';
import NamePreferredToggle from './PreferredToggle';
import NameCitationManagement from './CitationManagement';

export default function NameList({ names, person }) {
  const [editName, toggleEdit] = useState();
  const [activeDialog, toggleDialog] = useState();

  return (
    <div>
      {editName && (
        <NameEdit name={editName} onClose={() => toggleEdit(null)} />
      )}

      {activeDialog === 'NameAdd' && (
        <NameAdd name={{ personId: person.id }} onClose={toggleDialog} />
      )}

      <SimpleDataTable>
        <thead>
          <tr>
            <Heading>&nbsp;</Heading>
            <Heading>Prefix</Heading>
            <Heading>Given</Heading>
            <Heading>Surname</Heading>
            <Heading>Suffix</Heading>
            <Heading as="th" right>
              <IconButton
                icon="plus-circle"
                success
                sm
                onClick={() => toggleDialog('NameAdd')}
              >
                Add Name
              </IconButton>
            </Heading>
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
                />
                <IconButton
                  primary
                  icon="book"
                  onClick={() => toggleEdit(name)}
                >
                  0
                </IconButton>
                <NameDelete person={person} name={name} />
              </Cell>
            </tr>,
            <tr key={`sources-${name.id}`}>
              <Cell colSpan="3">
                <NameCitationManagement citations={name.sourceCitations} />
              </Cell>
            </tr>,
          ])}
        </tbody>
      </SimpleDataTable>
    </div>
  );
}
