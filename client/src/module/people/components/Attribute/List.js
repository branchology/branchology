import React, { useState } from 'react';
import { IconButton } from 'module/common/component/Button';
import SimpleDataTable, { Heading } from 'module/common/SimpleDataTable';
import NoResults from 'component/NoResults';
import AttributeAdd from './Add';
import CitationList from './CitationList';
import AttributeDelete from './Delete';
import AttributeEdit from './Edit';
import NoAttributes from './NoAttributes';

export default ({ person, attributes }) => {
  const [editAttribute, toggleEdit] = useState();
  const [activeDialog, toggleDialog] = useState();

  return attributes.length === 0 ? (
    <NoAttributes />
  ) : (
    <div>
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

      <SimpleDataTable>
        <thead>
          <tr>
            <Heading>Attribute</Heading>
            <Heading>Date</Heading>
            <Heading>Details</Heading>
            <Heading>Place</Heading>
            <Heading right>
              <IconButton
                icon="plus-circle"
                success
                sm
                onClick={() => toggleDialog('AttributeAdd')}
              >
                Add Attribute
              </IconButton>
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
                <IconButton
                  primary
                  icon="pencil"
                  onClick={() => toggleEdit(attribute)}
                >
                  Edit
                </IconButton>
                <AttributeDelete person={person} data={attribute} />
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
      </SimpleDataTable>

      {attributes.length === 0 && <NoResults />}
    </div>
  );
};
