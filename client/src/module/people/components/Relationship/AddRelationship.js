import { Formik, Form } from 'formik';
import React from 'react';
import { components } from 'module/common';
import { Fields as CitationFields } from '../Citation/Form';
import PlaceAutocomplete from '../PlaceAutocompleteX';
import createSpouseWrapper from './container/createSpouse';

const {
  ui: {
    Button,
    Dialog,
    Form: { FieldColumn, FieldRow, FieldSet, InputText, Select },
  },
} = components;

function prepareValuesForSubmit(values) {
  const submitValues = {
    personId: values.personId,
    sex: values.sex ? values.sex.value : null,
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
  prepareEvent('marriage', 'MARR');

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

const AddRelationshipForm = ({ createSpouse, person, onClose }) => {
  const initialValues = {
    personId: person.id,
    name: { given: '', surname: '' },
    sex: null,
    birth: { date: '' },
    death: { date: '' },
    marriage: { date: '' },
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

        return createSpouse(submitValues)
          .then(({ data: { createSpouse: { error } } }) => {
            if (!error) {
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
          title="Add Relationship"
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
            <FieldSet legend="Relation Info">
              <FieldRow>
                <FieldColumn flex={2}>
                  <InputText name="name[given]" label="Given Name" autoFocus />
                </FieldColumn>
                <FieldColumn flex={2}>
                  <InputText name="name[surname]" label="Surname" />
                </FieldColumn>
                <FieldColumn flex={1}>
                  <Select
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

              <FieldRow>
                <FieldColumn>
                  <InputText name="marriage[date]" label="Marriage Date" />
                </FieldColumn>
                <FieldColumn flex={2}>
                  <PlaceAutocomplete name="marriage[place]" label="Place: " />
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

export default createSpouseWrapper(AddRelationshipForm);
