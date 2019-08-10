import { Button, ButtonGroup, Divider, HTMLTable } from '@blueprintjs/core';
import React, { useState } from 'react';
import AttributeAdd from './Add';
import CitationList from './CitationList';
import AttributeDelete from './Delete';
import AttributeEdit from './Edit';
import NoAttributes from './NoAttributes';

export default ({ person, attributes }) => {
  const [editAttribute, toggleEdit] = useState();
  const [activeDialog, toggleDialog] = useState();
  const [citationsEvent, setCitationsEvent] = useState();

  return (
    <div>
      {citationsEvent && (
        <CitationList
          entity={citationsEvent}
          citations={citationsEvent.sourceCitations}
          onClose={() => setCitationsEvent(null)}
        />
      )}

      {editAttribute && (
        <AttributeEdit
          person={person}
          attribute={editAttribute}
          onClose={() => toggleEdit(null)}
        />
      )}

      {activeDialog === 'AttributeAdd' && (
        <AttributeAdd person={person} onClose={toggleDialog} />
      )}

      {attributes.length === 0 && (
        <NoAttributes onAddClick={() => toggleDialog('AttributeAdd')} />
      )}
      {attributes.length > 0 && (
        <HTMLTable interactive striped>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Date</th>
              <th>Details</th>
              <th>Place</th>
              <th className="right">
                <Button
                  icon="add"
                  intent="success"
                  small
                  minimal
                  onClick={() => toggleDialog('AttributeAdd')}
                >
                  Add Attribute
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attribute, index) => (
              <tr className={index % 2 === 1 ? 'alt' : ''} key={attribute.id}>
                <td>{attribute.type}</td>
                <td>{attribute.date}</td>
                <td>{attribute.data}</td>
                <td>{attribute.place && attribute.place.description}</td>
                <td className="right">
                  <ButtonGroup>
                    <Button
                      intent="primary"
                      icon="book"
                      small
                      minimal
                      onClick={() => setCitationsEvent(attribute)}
                    >
                      {attribute.sourceCitations.length}
                    </Button>
                    <Divider />
                    <Button
                      intent="primary"
                      icon="edit"
                      small
                      minimal
                      onClick={() => toggleEdit(attribute)}
                    />
                    <Divider />
                    <AttributeDelete person={person} data={attribute} />
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
