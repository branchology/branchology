import { Form, Formik } from 'formik';
import React from 'react';
import { components } from 'module/common';
import { NotificationContext } from 'module/common/notifications';
import PlaceAutocomplete from '../PlaceAutocompleteX';
import { Fields as CitationFields } from '../Citation/Form';

const {
  ui: {
    Button,
    Dialog,
    Form: { FieldColumn, FieldRow, FieldSet, InputText, Select },
  },
} = components;

function transfigureEventTypes(eventTypes) {
  return Object.keys(eventTypes).map(type => ({
    value: type,
    ...eventTypes[type],
  }));
}

function prepareValuesForSubmit(data) {
  const prepared = {
    id: data.id,
    event: {
      type: '',
    },
  };

  if (data.date) {
    prepared.event.date = data.date;
  }

  if (data.type) {
    prepared.event.type = data.type.value;
  }

  if (data.place && data.place.id) {
    prepared.event.placeId = data.place.id;
  } else if (data.place && data.place.value) {
    prepared.event.place = data.place.value;
  }

  if (data.source || data.citation || data.page) {
    const citation = { citation: data.citation, page: data.page };
    if (data.source && data.source.id) {
      citation.sourceId = data.source.id;
    } else if (data.source && data.source.value) {
      citation.source = data.source.value;
    }

    prepared.citations = [citation];
  }

  return prepared;
}

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

const AddEvent = ({ addEvent, eventTypes, onClose, parent }) => (
  <NotificationContext.Consumer>
    {({ notify }) => (
      <Formik
        initialValues={{
          id: parent.id,
          type: null,
          date: '',
          page: '',
          citation: '',
        }}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          const submitValues = prepareValuesForSubmit(values);

          return addEvent({ variables: submitValues })
            .then(({ data: { addEvent: { errors } } }) => {
              setSubmitting(false);
              if (!errors) {
                onClose();
                notify('Event Added!');
              }
              setErrors(mapMutationErrorsForFormik(errors, 'event.'));

              return errors;
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ handleSubmit, isSubmitting, setFieldTouched, setFieldValue }) => (
          <Dialog
            title="Add Event"
            onClose={onClose}
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
              <FieldSet legend="Event Details">
                <FieldRow>
                  <FieldColumn flex={1}>
                    <Select
                      name="type"
                      label="Type"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      options={transfigureEventTypes(eventTypes)}
                    />
                  </FieldColumn>

                  <FieldColumn flex={2}>
                    <InputText name="date" label="Date" />
                  </FieldColumn>
                </FieldRow>

                <PlaceAutocomplete name="place" label="Place: " />
              </FieldSet>

              <FieldSet legend="Source (optional)">
                <CitationFields initialValues={{}} />
              </FieldSet>
            </Form>
          </Dialog>
        )}
      </Formik>
    )}
  </NotificationContext.Consumer>
);

export default AddEvent;
