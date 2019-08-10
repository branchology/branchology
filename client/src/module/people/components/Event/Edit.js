import { Form, Formik } from 'formik';
import React from 'react';
import { components } from 'module/common';
import { NotificationContext } from 'module/common/notifications';
import PlaceAutocomplete from '../PlaceAutocompleteX';
import EventUpdateMutation from '../../query/eventUpdateMutation';

const {
  ui: {
    Dialog,
    DialogCommonFooter,
    Form: { FieldColumn, FieldRow, InputText, Select },
  },
} = components;

function transfigureEventTypes(eventTypes) {
  return Object.keys(eventTypes).map(type => ({
    value: type,
    ...eventTypes[type],
  }));
}

function mapPlace(place) {
  return { id: place.id, value: place.description };
}

function initialValues(event, eventTypes) {
  const { id, type, date, place } = event;

  const initialValues = {
    id,
    type: { value: type, ...eventTypes[type] },
    date: date ? date : '',
  };

  if (place) {
    initialValues.place = mapPlace(place);
  }

  return initialValues;
}

function prepareValuesForSubmit(data) {
  const prepared = {
    id: data.id,
    event: { date: data.date },
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

const EventEdit = ({ event: editEvent, eventTypes, onClose, updateEvent }) => (
  <NotificationContext.Consumer>
    {({ notify }) => (
      <Formik
        initialValues={initialValues(editEvent, eventTypes)}
        onSubmit={(values, { setSubmitting }) => {
          const submitValues = prepareValuesForSubmit(values);

          return updateEvent({ variables: submitValues }).then(
            ({
              data: {
                updateEvent: { errors, event },
              },
            }) => {
              setSubmitting(false);
              if (!errors) {
                onClose();
                notify('Person Event Updated!');
              }

              return event;
            },
          );
        }}
      >
        {({ handleSubmit, isSubmitting, setFieldTouched, setFieldValue }) => (
          <Dialog
            title="Edit Person Event"
            footer={
              <div>
                <DialogCommonFooter
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmit}
                  onClose={onClose}
                />
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
                    options={transfigureEventTypes(eventTypes)}
                  />
                </FieldColumn>

                <FieldColumn flex={2}>
                  <InputText name="date" label="Date" />
                </FieldColumn>
              </FieldRow>

              <PlaceAutocomplete
                name="place"
                label="Place: "
                hardValues={editEvent.place ? [mapPlace(editEvent.place)] : []}
              />
            </Form>
          </Dialog>
        )}
      </Formik>
    )}
  </NotificationContext.Consumer>
);

export default EventUpdateMutation(EventEdit);
