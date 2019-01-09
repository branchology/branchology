import { Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'module/common/component/Button';
import {
  FieldColumn,
  FieldRow,
  InputText,
  Select,
} from 'module/common/component/FormX';
import { Dialog, StandardDialogHeader } from 'module/common/modal';
import { NotificationContext } from 'module/common/notifications';
import eventTypes from './config';
import PlaceAutocomplete from '../PlaceAutocompleteX';
import EventCreateMutation from '../../query/eventCreateMutation';
// import { validateEvent } from '../../../../../../shared/validator';

function transfigureEventTypes() {
  return Object.keys(eventTypes).map(type => ({
    value: type,
    ...eventTypes[type],
  }));
}

function prepareValuesForSubmit(data) {
  const prepared = {
    personId: data.personId,
    event: {},
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

  return prepared;
}

const AddEvent = ({ addPersonEvent, onClose, person }) => {
  const initialValues = {
    personId: person.id,
    type: null,
    date: '',
  };

  return (
    <NotificationContext.Consumer>
      {({ notify }) => (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            const submitValues = prepareValuesForSubmit(values);

            return addPersonEvent({ variables: submitValues }).then(
              ({
                data: {
                  addPersonEvent: { errors, event },
                },
              }) => {
                setSubmitting(false);
                if (!errors) {
                  onClose();
                  notify('Person Event Added!');
                }

                return event;
              },
            );
          }}
        >
          {({ handleSubmit, isSubmitting, setFieldTouched, setFieldValue }) => (
            <Dialog
              header={<StandardDialogHeader title="Add Person Event" />}
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
                <FieldRow>
                  <FieldColumn flex={1}>
                    <Select
                      name="type"
                      label="Type"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      options={transfigureEventTypes()}
                    />
                  </FieldColumn>

                  <FieldColumn flex={2}>
                    <InputText name="date" label="Date" />
                  </FieldColumn>
                </FieldRow>

                <PlaceAutocomplete name="place" label="Place: " />
              </Form>
            </Dialog>
          )}
        </Formik>
      )}
    </NotificationContext.Consumer>
  );
};

export default EventCreateMutation(AddEvent);
