import { Form, Formik } from 'formik';
import React from 'react';
import { components } from 'module/common';
import { NotificationContext } from 'module/common/notifications';

const {
  ui: {
    Button,
    Dialog,
    Form: { InputText },
  },
} = components;

function mapMutationErrorsForFormik(errors, stripKey = '') {
  const newErrors = {};
  for (const error of errors) {
    const formattedKey = error.field.replace(stripKey, '');
    if (!(formattedKey in newErrors)) {
      newErrors[formattedKey] = error.message.replace(stripKey, '');
    } else {
      newErrors[formattedKey] += ` ${error.message.replace(stripKey, '')}`;
    }
  }

  return newErrors;
}

export default function NameForm({
  initialValues,
  onClose,
  onSave,
  prepareValuesForSubmit,
  title,
}) {
  return (
    <NotificationContext.Consumer>
      {({ notify }) => (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            const submitValues = prepareValuesForSubmit(values);

            return onSave(submitValues)
              .then(() => {
                notify('Name Saved Successfully');
                onClose();
              })
              .catch(errors => {
                setSubmitting(false);
                setErrors(mapMutationErrorsForFormik(errors, 'name.'));
              });
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Dialog
              title={title}
              footer={
                <div>
                  <Button danger type="button" onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    primary
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </div>
              }
            >
              <Form>
                <InputText name="given" label="Given:" autoFocus />
                <InputText name="surname" label="Surname:" />
              </Form>
            </Dialog>
          )}
        </Formik>
      )}
    </NotificationContext.Consumer>
  );
}
