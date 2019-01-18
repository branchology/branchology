import React, { PureComponent } from 'react';
import { createApiValidationError, translateApiErrors } from 'lib';
import { components } from 'module/common';
import { Form, InputText, Select } from 'module/common/component/Form';
import { NotificationContext } from 'module/common/notifications';
import attributeTypes from './config';
import PlaceAutocomplete from '../PlaceAutocomplete';
import AttributeCreateMutation from '../../query/attributeCreateMutation';

const {
  ui: { Button, Dialog },
} = components;

function transfigureAttributeTypes() {
  return Object.keys(attributeTypes).map(type => ({
    value: type,
    ...attributeTypes[type],
  }));
}

class AddAttribute extends PureComponent {
  static contextType = NotificationContext;

  submit = values => {
    return this.props
      .addPersonAttribute({ variables: values })
      .then(({ data: { addPersonAttribute: { errors, attribute } } }) => {
        if (errors) {
          throw createApiValidationError(
            translateApiErrors(errors, 'attribute'),
          );
        }

        this.props.onClose();
        this.context.notify('Person Attribute Added!');
        return attribute;
      });
  };

  render() {
    const { onClose, person } = this.props;

    return (
      <Form
        prepareValuesForSubmit={({ type, data, date, place, placeId }) => {
          const prepared = {
            personId: person.id,
            attribute: { type, data, date },
          };

          if (placeId) {
            prepared.attribute.placeId = placeId;
          } else if (place) {
            prepared.attribute.place = place;
          }

          return prepared;
        }}
        onSubmit={this.submit}
        validate={() => null /* TODO: FIXME: */}
        render={({ container, submit }) => (
          <Dialog
            title="Add Person Attribute"
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
              options={transfigureAttributeTypes()}
              container={container}
            />
            <InputText
              name="data"
              label="Data: "
              container={container}
              autoFocus
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

export default AttributeCreateMutation(AddAttribute);
