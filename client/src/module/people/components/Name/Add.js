import React from 'react';
import NameForm from './Form';
import nameCreateMutation from '../../query/nameCreateMutation';

function prepareValuesForSubmit({ given, personId, surname }) {
  return {
    personId,
    name: { given, surname },
  };
}

const AddName = ({ addPersonName, onClose, person }) => (
  <NameForm
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
