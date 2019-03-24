import { Form, Formik } from 'formik';
import React from 'react';
import { mapMutationErrorsForFormik } from 'lib';
import { components } from 'module/common';
import { NotificationContext } from 'module/common/notifications';
import SourceAutocomplete from './SourceAutocomplete';

const {
  ui: {
    Button,
    Dialog,
    Form: { InputText, TextArea },
  },
} = components;

export default function CitationForm({
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
            const variables = prepareValuesForSubmit(values);

            return onSave(variables)
              .then(() => {
                notify('Citation Saved!');
                onClose();
              })
              .catch(errors => {
                setSubmitting(false);
                setErrors(mapMutationErrorsForFormik(errors, 'citation.'));
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
                <SourceAutocomplete
                  name="source"
                  label="Source: "
                  autoFocus
                  hardValues={
                    initialValues.source ? [initialValues.source] : []
                  }
                />
                <InputText name="page" label="Page: " />
                <TextArea name="citation" label="Citation: " />
              </Form>
            </Dialog>
          )}
        </Formik>
      )}
    </NotificationContext.Consumer>
  );
}
