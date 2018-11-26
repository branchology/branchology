import React, { PureComponent } from 'react';
import { createApiValidationError, translateApiErrors } from 'lib';
import { Button } from 'module/common/component/Button';
import { Form, InputText, Select } from 'module/common/component/Form';
import { Dialog, StandardDialogHeader } from 'module/common/modal';
import { NotificationContext } from 'module/common/notifications';
import eventTypes from './config';
import PlaceAutocomplete from '../PlaceAutocomplete';
import EventUpdateMutation from '../../query/eventUpdateMutation';

function transfigureEventTypes() {
  return Object.keys(eventTypes).map(type => ({
    value: type,
    ...eventTypes[type],
  }));
}

function initialValues(event) {
  const { id, type, date, place } = event;

  const initialValues = {
    id,
    type,
    date,
    place: null,
    placeId: null,
    __place__: null,
  };

  if (place) {
    initialValues.place = null;
    initialValues.__place__ = place.description;
    initialValues.placeId = place.id;
  }

  return initialValues;
}

class EventEdit extends PureComponent {
  static contextType = NotificationContext;

  submit = values => {
    return this.props
      .updateEvent({ variables: values })
      .then(({ data: { updateEvent: { errors, event } } }) => {
        if (errors) {
          throw createApiValidationError(translateApiErrors(errors, 'event'));
        }

        this.props.onClose();
        this.context.notify('Person Event Updated!');
        return event;
      });
  };

  render() {
    const { event, onClose } = this.props;

    return (
      <Form
        initialValues={initialValues(event)}
        prepareValuesForSubmit={data => {
          const prepared = {
            id: event.id,
            event: { type: data.type, date: data.date },
          };

          if (data.placeId) {
            prepared.event.placeId = data.placeId;
          } else if (data.place) {
            prepared.event.place = data.place;
          }

          return prepared;
        }}
        validate={() => null}
        onSubmit={this.submit}
        render={({ container, submit }) => (
          <Dialog
            header={<StandardDialogHeader title="Edit Person Event" />}
            footer={
              <div>
                <Button type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="button" onClick={submit}>
                  Save
                </Button>
              </div>
            }
          >
            <Select
              name="type"
              label="Type:"
              autoFocus
              options={transfigureEventTypes()}
              container={container}
            />
            <InputText name="date" label="Date: " container={container} />
            <PlaceAutocomplete
              name="place"
              label="Place: "
              autoFocus
              container={container}
              hardValues={event.place ? [event.place] : []}
            />
          </Dialog>
        )}
      />
    );
  }
}

export default EventUpdateMutation(EventEdit);
