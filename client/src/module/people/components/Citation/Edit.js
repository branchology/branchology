import React from 'react';
import CitationFrom from './Form';

function initialValues(record) {
  const { id, citation, page, source } = record;

  const initialValues = {
    id,
    citation,
    page,
  };

  if (source) {
    initialValues.source = mapSource(source);
  }

  return initialValues;
}

function mapSource(source) {
  return { id: source.id, value: source.title };
}

function prepareValuesForSubmit({ id, source, page, citation }) {
  const prepared = { id, citation: { citation, page } };

  if (source.id) {
    prepared.citation.sourceId = source.id;
  } else if (source.value) {
    prepared.citation.source = source.value;
  }

  return prepared;
}

const EditSourceCitation = ({ citation, updateCitation, entity, onClose }) => (
  <CitationFrom
    entity={entity}
    initialValues={initialValues(citation)}
    onClose={onClose}
    onSave={variables => {
      return new Promise((resolve, reject) => {
        updateCitation({
          variables,
        })
          .then(({ data: { updateCitation: { errors } } }) => {
            if (errors) {
              reject(errors);
            } else {
              resolve();
            }
          })
          .catch(() => {
            reject({});
          });
      });
    }}
    prepareValuesForSubmit={prepareValuesForSubmit}
    title="Edit Source Citation"
  />
);

export default EditSourceCitation;
