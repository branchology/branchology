import React from 'react';
import NameForm from './Form';
import updatePersonNameWrapper from '../../query/nameUpdateMutation';

function initialValues(initialValue) {
  const { id, given, surname } = initialValue;
  return { id, given, surname };
}

function prepareValuesForSubmit({ given, id, surname }) {
  return {
    id,
    name: { given, surname },
  };
}

const EditName = ({ onClose, name, updatePersonName }) => (
  <NameForm
    initialValues={initialValues(name)}
    onClose={onClose}
    onSave={variables => {
      return new Promise((resolve, reject) => {
        updatePersonName({
          variables,
        })
          .then(({ data: { updatePersonName: { errors } } }) => {
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
    title="Update Person Name"
  />
);

export default updatePersonNameWrapper(EditName);
