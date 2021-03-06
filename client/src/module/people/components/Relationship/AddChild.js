import { Formik, Form } from 'formik';
import React from 'react';
import { components } from 'module/common';
import { Fields as CitationFields } from '../Citation/Form';
import PlaceAutocomplete from '../PlaceAutocompleteX';
import createChildWrapper from './container/createChild';

const {
  ui: {
    Dialog,
    DialogCommonFooter,
    Form: { FieldColumn, FieldRow, FieldSet, InputText, Select },
  },
} = components;

const lineageTypes = [
  { label: 'Birth', value: 'BIRTH' },
  { label: 'Adopted', value: 'ADOPTED' },
  { label: 'Foster', value: 'FOSTER' },
  { label: 'Sealing', value: 'SEALING' },
];

function prepareValuesForSubmit(values) {
  const submitValues = {
    relationshipId: values.relationshipId,
    sex: values.sex ? values.sex.value : null,
    lineage: values.lineage.value,
  };

  if (values.name && (values.name.given || values.name.surname)) {
    submitValues.name = {
      given: values.name.given,
      surname: values.name.surname,
    };
  }

  function prepareEvent(key, type) {
    if (values[key] && (values[key].date || values[key].place)) {
      submitValues[key] = { type, date: values[key].date };
      if (values[key].place && values[key].place.id) {
        submitValues[key].placeId = values[key].place.id;
      } else if (values[key].place && values[key].place.value) {
        submitValues[key].place = values[key].place.value;
      }
    }
  }

  prepareEvent('birth', 'BIRT');
  prepareEvent('death', 'DEAT');

  if (values.source || values.citation || values.page) {
    const citation = { citation: values.citation, page: values.page };
    if (values.source && values.source.id) {
      citation.sourceId = values.source.id;
    } else if (values.source && values.source.value) {
      citation.source = values.source.value;
    }

    submitValues.citations = [citation];
  }

  return submitValues;
}

const AddChildForm = ({ createChild, relationship, onClose }) => {
  const initialValues = {
    relationshipId: relationship.id,
    name: { given: '', surname: '' },
    sex: null,
    lineage: lineageTypes.find(t => t.value === 'BIRTH'),
    birth: { date: '' },
    death: { date: '' },
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        let errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const submitValues = prepareValuesForSubmit(values);

        return createChild(submitValues)
          .then(({ data: { createChild: { errors } } }) => {
            if (!errors) {
              setSubmitting(false);
              onClose();
            }
          })
          .catch(e => {
            setSubmitting(false);
          });
      }}
    >
      {({ handleSubmit, isSubmitting, setFieldTouched, setFieldValue }) => (
        <Dialog
          title="Add Child"
          onClose={onClose}
          footer={
            <DialogCommonFooter
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onClose={onClose}
            />
          }
        >
          <Form>
            <FieldSet legend="Child Info">
              <FieldRow>
                <FieldColumn flex={1}>
                  <Select
                    autoFocus
                    name="sex"
                    label="Sex"
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    options={[
                      { value: 'F', label: 'Female' },
                      { value: 'M', label: 'Male' },
                    ]}
                  />
                </FieldColumn>
                <FieldColumn flex={1}>
                  <Select
                    name="lineage"
                    label="Lineage"
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    options={lineageTypes}
                  />
                </FieldColumn>
              </FieldRow>

              <FieldRow>
                <FieldColumn flex={1}>
                  <InputText name="name[given]" label="Given Name" />
                </FieldColumn>
                <FieldColumn flex={1}>
                  <InputText name="name[surname]" label="Surname" />
                </FieldColumn>
              </FieldRow>

              <FieldRow>
                <FieldColumn>
                  <InputText name="birth[date]" label="Birth Date" />
                </FieldColumn>
                <FieldColumn flex={2}>
                  <PlaceAutocomplete name="birth[place]" label="Place: " />
                </FieldColumn>
              </FieldRow>

              <FieldRow>
                <FieldColumn>
                  <InputText name="death[date]" label="Death Date" />
                </FieldColumn>
                <FieldColumn flex={2}>
                  <PlaceAutocomplete name="death[place]" label="Place: " />
                </FieldColumn>
              </FieldRow>
            </FieldSet>

            <FieldSet legend="Source (optional)">
              <p>
                <small>
                  Note: Any citation given below will be applied to the any
                  birth, death, and marriage events filled out above.
                </small>
              </p>
              <CitationFields initialValues={{}} />
            </FieldSet>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default createChildWrapper(AddChildForm);
