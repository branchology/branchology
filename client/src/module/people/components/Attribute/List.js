import React, { useState } from 'react';
import { components } from 'module/common';
import AttributeAdd from './Add';
import CitationList from './CitationList';
import AttributeDelete from './Delete';
import AttributeEdit from './Edit';
import NoAttributes from './NoAttributes';

const {
  ui: {
    DataTable: { Heading, Table },
    IconButton,
  },
  WithUser,
} = components;

export default ({ person, attributes }) => {
  const [editAttribute, toggleEdit] = useState();
  const [activeDialog, toggleDialog] = useState();

  return (
    <div>
      <WithUser>
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
      </WithUser>

      {attributes.length === 0 && (
        <NoAttributes onAddClick={() => toggleDialog('AttributeAdd')} />
      )}

      {attributes.length > 0 && (
        <Table>
          <thead>
            <tr>
              <Heading>Attribute</Heading>
              <Heading>Date</Heading>
              <Heading>Details</Heading>
              <Heading>Place</Heading>
              <Heading right>
                <WithUser>
                  <IconButton
                    icon="plus-circle"
                    success
                    sm
                    onClick={() => toggleDialog('AttributeAdd')}
                  >
                    Add Attribute
                  </IconButton>
                </WithUser>
              </Heading>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attribute, index) => [
              <tr className={index % 2 === 1 ? 'alt' : ''} key={attribute.id}>
                <td>{attribute.type}</td>
                <td>{attribute.date}</td>
                <td>{attribute.data}</td>
                <td>{attribute.place && attribute.place.description}</td>
                <td className="actions">
                  <WithUser>
                    <IconButton
                      primary
                      icon="pencil-alt"
                      onClick={() => toggleEdit(attribute)}
                    >
                      Edit
                    </IconButton>
                    <AttributeDelete person={person} data={attribute} />
                  </WithUser>
                </td>
              </tr>,
              <tr
                className={index % 2 === 1 ? 'alt' : ''}
                key={`sources-${attribute.id}`}
              >
                <td colSpan="5" className="citations">
                  <CitationList
                    citations={attribute.sourceCitations}
                    entity={attribute}
                  />
                </td>
              </tr>,
            ])}
          </tbody>
        </Table>
      )}
    </div>
  );
};
