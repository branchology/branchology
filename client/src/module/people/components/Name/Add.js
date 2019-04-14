import React from 'react';
import NameForm from './Form';
import nameCreateMutation from '../../query/nameCreateMutation';

function prepareValuesForSubmit({ given, personId, surname, ...other }) {
  const prepared = {
    personId,
    name: { given, surname },
  };

  if (other.source || other.citation || other.page) {
    const citation = { citation: other.citation, page: other.page };
    if (other.source && other.source.id) {
      citation.sourceId = other.source.id;
    } else if (other.source && other.source.value) {
      citation.source = other.source.value;
    }

    prepared.citations = [citation];
  }

  return prepared;
}

const AddName = ({ addPersonName, onClose, person }) => (
  <NameForm
    includeCitation={true}
    initialValues={{ personId: person.id, surname: '', given: '' }}
    onClose={onClose}
    onSave={variables => {
      return new Promise((resolve, reject) => {
        addPersonName({
          variables,
        })
          .then(({ data: { addPersonName: { errors } } }) => {
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
    title="Add Person Name"
  />
);

export default nameCreateMutation(AddName);
