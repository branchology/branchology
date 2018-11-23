import React, { PureComponent } from 'react';
import { createApiValidationError, translateApiErrors } from 'lib';
import { Button } from 'module/common/component/Button';
import { Form, InputText, Select } from 'module/common/component/Form';
import { Dialog, StandardDialogHeader } from 'module/common/modal';
import eventTypes from './config';
import PlaceAutocomplete from '../PlaceAutocomplete';
import EventCreateMutation from '../../query/eventCreateMutation';
// import { validateEvent } from '../../../../../../shared/validator';

function transfigureEventTypes() {
  return Object.keys(eventTypes).map(type => ({
    value: type,
    ...eventTypes[type],
  }));
}

class AddEvent extends PureComponent {
  submit = values => {
    return this.props
      .addPersonEvent({ variables: values })
      .then(({ data: { addPersonEvent: { errors, event } } }) => {
        if (errors) {
          throw createApiValidationError(translateApiErrors(errors, 'event'));
        }

        this.props.onClose();
        this.context.notify('Person Event Added!');
        return event;
      });
  };

  render() {
    const { onClose, person } = this.props;

    return (
      <Form
        prepareValuesForSubmit={data => {
          const prepared = {
            personId: person.id,
            event: { type: data.type, date: data.date },
          };
          if (data.placeId) {
            prepared.event.placeId = data.placeId;
          } else if (data.place) {
            prepared.event.place = data.place;
          }

          return prepared;
        }}
        onSubmit={this.submit}
        validate={() => ({}) /*validateEvent*/}
        render={({ container, submit }) => (
          <Dialog
            header={<StandardDialogHeader title="Add Person Event" />}
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
            />
          </Dialog>
        )}
      />
    );
  }
}

export default EventCreateMutation(AddEvent);
