import { Form, Formik } from 'formik';
import React from 'react';
import { components } from 'module/common';
import { NotificationContext } from 'module/common/notifications';
import { Fields as CitationFields } from '../Citation/Form';

const {
  ui: {
    Button,
    Dialog,
    Form: { FieldRow, FieldSet, InputText },
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
  includeCitation,
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
                <FieldSet legend="Name Details">
                  <InputText name="given" label="Given:" autoFocus />
                  <InputText name="surname" label="Surname:" />
                </FieldSet>

                {includeCitation && (
                  <FieldSet legend="Source (optional)">
                    <CitationFields initialValues={{}} />
                  </FieldSet>
                )}
              </Form>
            </Dialog>
          )}
        </Formik>
      )}
    </NotificationContext.Consumer>
  );
}
