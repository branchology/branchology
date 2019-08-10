import React, { PureComponent } from 'react';
import { createApiValidationError, translateApiErrors } from 'lib';
import { Dialog, DialogCommonFooter } from 'module/common/component/ui';
import { Form, InputText, Select } from 'module/common/component/Form';
import { NotificationContext } from 'module/common/notifications';
import attributeTypes from './config';
import PlaceAutocomplete from '../PlaceAutocomplete';
import AttributeUpdateMutation from '../../query/attributeUpdateMutation';

function transfigureAttributeTypes() {
  return Object.keys(attributeTypes).map(type => ({
    value: type,
    ...attributeTypes[type],
  }));
}

function initialValues(attribute) {
  const { id, data, type, date, place } = attribute;

  const initialValues = {
    id,
    data,
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

class AttributeEdit extends PureComponent {
  static contextType = NotificationContext;

  submit = values => {
    return this.props
      .updateAttribute({ variables: values })
      .then(({ data: { updateAttribute: { errors, attribute } } }) => {
        if (errors) {
          throw createApiValidationError(
            translateApiErrors(errors, 'attribute'),
          );
        }

        this.props.onClose();
        this.context.notify('Person Attribute Updated!');
        return attribute;
      });
  };

  render() {
    const { attribute, onClose } = this.props;

    return (
      <Form
        initialValues={initialValues(attribute)}
        validate={() => {
          /* TODO: FIXME:*/
        }}
        prepareValuesForSubmit={data => {
          const { id, place, placeId, __place__, ...attribute } = data;

          const prepared = {
            id,
            attribute,
          };

          if (placeId) {
            prepared.attribute.placeId = placeId;
          } else if (place) {
            prepared.attribute.place = place;
          }

          return prepared;
        }}
        onSubmit={this.submit}
        render={({ container, submit }) => (
          <Dialog
            title="Edit Person Attribute"
            footer={
              <DialogCommonFooter
                isSubmitting={false}
                onSubmit={submit}
                onClose={onClose}
              />
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
              hardValues={attribute.place ? [attribute.place] : []}
            />
          </Dialog>
        )}
      />
    );
  }
}

export default AttributeUpdateMutation(AttributeEdit);
