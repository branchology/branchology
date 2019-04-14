import { Form, Formik } from 'formik';
import React from 'react';
import { mapMutationErrorsForFormik } from 'lib';
import { components } from 'module/common';
import { NotificationContext } from 'module/common/notifications';
import attributeTypes from './config';
import { Fields as CitationFields } from '../Citation/Form';
import PlaceAutocomplete from '../PlaceAutocompleteX';
import AttributeCreateMutation from '../../query/attributeCreateMutation';

const {
  ui: {
    Button,
    Dialog,
    Form: { FieldColumn, FieldRow, FieldSet, InputText, Select },
  },
} = components;

function transfigureAttributeTypes() {
  return Object.keys(attributeTypes).map(type => ({
    value: type,
    ...attributeTypes[type],
  }));
}

function prepareValuesForSubmit({
  personId,
  type = '',
  data,
  date,
  place,
  placeId,
  ...other
}) {
  const prepared = {
    personId,
    attribute: { type: '' },
  };

  if (type) {
    prepared.attribute.type = type.value;
  }

  if (date) {
    prepared.attribute.date = date;
  }

  if (data) {
    prepared.attribute.data = data;
  }

  if (placeId) {
    prepared.attribute.placeId = placeId;
  } else if (place && place.value) {
    prepared.attribute.place = place.value;
  }

  if (other.source || other.citation || other.page) {
    const citation = { citation: other.citation, page: other.page };
    if (other.source && other.source.id) {
      citation.sourceId = other.source.id;
    } else if (other.source && other.source.value) {
      citation.source = other.source.value;
    }

    prepared.citations = [citation];
  }

  return prepared;
}

function AddAttribute({ addPersonAttribute, onClose, person }) {
  return (
    <NotificationContext.Consumer>
      {({ notify }) => (
        <Formik
          initialValues={{
            personId: person.id,
            type: null,
            date: '',
            data: '',
            page: '',
            citation: '',
          }}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            const submitValues = prepareValuesForSubmit(values);

            return addPersonAttribute({ variables: submitValues })
              .then(({ data: { addPersonAttribute: { errors } } }) => {
                setSubmitting(false);
                if (!errors) {
                  onClose();
                  notify('Attribute Added!');
                  return;
                }
                setErrors(mapMutationErrorsForFormik(errors, 'attribute.'));

                return errors;
              })
              .catch(e => {
                notify('Failed to save attribute', 'error');
                setSubmitting(false);
              });
          }}
        >
          {({ handleSubmit, isSubmitting, setFieldTouched, setFieldValue }) => (
            <Dialog
              title="Add Person Attribute"
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
                <FieldSet legend="Attribute Details">
                  <FieldRow>
                    <FieldColumn flex={1}>
                      <Select
                        name="type"
                        label="Type"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        options={transfigureAttributeTypes()}
                      />
                    </FieldColumn>

                    <FieldColumn flex={2}>
                      <InputText name="data" label="Data: " />
                    </FieldColumn>
                  </FieldRow>

                  <FieldRow>
                    <FieldColumn flex={1}>
                      <InputText name="date" label="Date" />
                    </FieldColumn>
                    <FieldColumn flex={2}>
                      <PlaceAutocomplete name="place" label="Place: " />
                    </FieldColumn>
                  </FieldRow>
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
}

export default AttributeCreateMutation(AddAttribute);
