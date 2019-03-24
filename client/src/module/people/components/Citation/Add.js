import React from 'react';
import CitationFrom from './Form';

function prepareValuesForSubmit({ entityId, source, page, citation }) {
  const prepared = { entityId, citation: { citation, page } };

  if (source && source.id) {
    prepared.citation.sourceId = source.id;
  } else if (source && source.value) {
    prepared.citation.source = source.value;
  }

  return prepared;
}

const AddSourceCitation = ({ addCitation, entity, onClose }) => (
  <CitationFrom
    entity={entity}
    initialValues={{
      entityId: entity.id,
      source: { id: '', value: '' },
      page: '',
      citation: '',
    }}
    onClose={onClose}
    onSave={variables => {
      return new Promise((resolve, reject) => {
        addCitation({
          variables,
        })
          .then(({ data: { addCitation: { errors } } }) => {
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
    title="Add Source Citation"
  />
);

export default AddSourceCitation;
