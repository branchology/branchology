import { Button, ButtonGroup, Divider, HTMLTable } from '@blueprintjs/core';
import React, { useState } from 'react';
import NameAdd from './Add';
import CitationList from './CitationList';
import NameDelete from './Delete';
import NameEdit from './Edit';
import NamePreferredToggle from './PreferredToggle';

export default function NameList({ names, person }) {
  const [editName, toggleEdit] = useState();
  const [activeDialog, toggleDialog] = useState();

  return (
    <div>
      {editName && (
        <NameEdit name={editName} onClose={() => toggleEdit(null)} />
      )}

      {activeDialog === 'NameAdd' && (
        <NameAdd
          person={person}
          name={{ personId: person.id }}
          onClose={toggleDialog}
        />
      )}

      <HTMLTable interactive striped>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Prefix</th>
            <th>Given</th>
            <th>Surname</th>
            <th>Suffix</th>
            <th className="right">
              <Button
                icon="add"
                intent="success"
                small
                minimal
                onClick={() => toggleDialog('NameAdd')}
              >
                Add Name
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {names.map(name => [
            <tr key={name.id}>
              <td className="center middle">
                <NamePreferredToggle name={name} />
              </td>
              <td>{name.prefix}</td>
              <td>{name.given}</td>
              <td>{name.surname}</td>
              <td>{name.suffix}</td>
              <td className="right">
                <ButtonGroup>
                  <Button
                    intent="primary"
                    icon="book"
                    minimal
                    small
                    onClick={() => toggleEdit(name)}
                  >
                    {name.sourceCitations.length}
                  </Button>
                  <Divider />
                  <Button
                    intent="primary"
                    icon="edit"
                    minimal
                    small
                    onClick={() => toggleEdit(name)}
                  />
                  <Divider />
                  <NameDelete person={person} name={name} />
                </ButtonGroup>
              </td>
            </tr>,
            <tr key={`sources-${name.id}`}>
              <td colSpan="3" className="citations">
                <CitationList citations={name.sourceCitations} entity={name} />
              </td>
            </tr>,
          ])}
        </tbody>
      </HTMLTable>
    </div>
  );
}
