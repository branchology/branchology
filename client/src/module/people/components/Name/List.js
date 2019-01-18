import React, { useState } from 'react';
import { components } from 'module/common';
import NameAdd from './Add';
import CitationList from './CitationList';
import NameDelete from './Delete';
import NameEdit from './Edit';
import NamePreferredToggle from './PreferredToggle';

const {
  ui: {
    DataTable: { Cell, Heading, Table },
    IconButton,
  },
  WithUser,
} = components;

export default function NameList({ names, person }) {
  const [editName, toggleEdit] = useState();
  const [activeDialog, toggleDialog] = useState();

  return (
    <div>
      <WithUser>
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
      </WithUser>

      <Table>
        <thead>
          <tr>
            <Heading>&nbsp;</Heading>
            <Heading>Prefix</Heading>
            <Heading>Given</Heading>
            <Heading>Surname</Heading>
            <Heading>Suffix</Heading>
            <Heading right>
              <WithUser>
                <IconButton
                  icon="plus-circle"
                  success
                  sm
                  onClick={() => toggleDialog('NameAdd')}
                >
                  Add Name
                </IconButton>
              </WithUser>
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
                <WithUser>
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
                </WithUser>
              </Cell>
            </tr>,
            <tr key={`sources-${name.id}`}>
              <Cell colSpan="3" className="citations">
                <CitationList citations={name.sourceCitations} entity={name} />
              </Cell>
            </tr>,
          ])}
        </tbody>
      </Table>
    </div>
  );
}
