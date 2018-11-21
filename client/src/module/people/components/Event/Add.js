import React, { PureComponent } from 'react';
import { Button } from 'module/common/component/Button';
import { Form, InputText } from 'module/common/components/Form';
import { Dialog, StandardDialogHeader } from 'module/common/modal';

function initialValues(attribute) {
  const {
    id,
    data,
    event: {
      id: eventId,
      type,
      date,
      place: { id: placeId, description },
    },
  } = attribute;

  return {
    id,
    data,
    event: { id: eventId, type, date, place: { id: placeId, description } },
  };
}

function normalize(submit, formData) {
  const {
    id,
    data,
    event: {
      id: eventId,
      type,
      date,
      place: { id: placeId, description },
    },
  } = formData;

  const attribute = {
    data,
    event: { id: eventId, type, date },
  };

  if (placeId) {
    attribute.event.placeId = placeId;
  } else if (description) {
    attribute.event.place = description;
  }

  return submit({ variables: { id, attribute } }).then(result => {
    return result.data.updateAttribute.attribute;
  });
}

function validateSimpleDate(dateString) {
  const validMonths = {
    JAN: '01',
    FEB: '02',
    MAR: '03',
    APR: '04',
    MAY: '05',
    JUN: '06',
    JUL: '07',
    AUG: '08',
    SEP: '09',
    OCT: '10',
    NOV: '11',
    DEC: '12',
  };

  let matches = dateString.match(/^([0-9]{1,2}) ([A-Za-z]{3}) ([0-9]{4})$/i);
  if (matches) {
    if (!Object.keys(validMonths).includes(matches[2].toUpperCase())) {
      return false;
    }

    if (parseInt(matches[3]) > new Date().getFullYear()) {
      return false;
    }

    const daysInMonth = new Date(
      matches[3],
      validMonths[matches[2].toUpperCase()],
      0,
    ).getDate();
    if (matches[1] > daysInMonth) {
      return false;
    }

    return true;
  }

  matches = dateString.match(/^([A-Za-z]{3}) ([0-9]{4})$/i);
  if (matches) {
    if (!validMonths.includes(matches[1].toUpperCase())) {
      return false;
    }

    if (parseInt(matches[2]) > new Date().getFullYear()) {
      return false;
    }

    return true;
  }

  matches = dateString.match(/^([0-9]{1,2}) ([A-Za-z]{3})$/i);
  if (matches) {
    if (!Object.keys(validMonths).includes(matches[2].toUpperCase())) {
      return false;
    }

    // we don't know which year it is, so we don't know if february has 29 days
    // or not. Assume it does.
    const daysInMonth = new Date(
      2000, // a random leap year appears!
      validMonths[matches[2].toUpperCase()],
      0,
    ).getDate();
    if (matches[1] > daysInMonth) {
      return false;
    }

    return true;
  }

  matches = dateString.match(/^([0-9]{4})$/i);
  if (matches && parseInt(matches[1]) <= new Date().getFullYear()) {
    return true;
  }

  return false;
}

function validateGedcomDate(dateString) {
  let matches = dateString.match(/^BET (.*) AND (.*)/i);
  if (matches) {
    return validateSimpleDate(matches[1]) && validateSimpleDate(matches[2]);
  }

  matches = dateString.match(/^(AFT|ABT|BEF) (.*)$/i);
  if (matches) {
    return validateSimpleDate(matches[1]);
  }

  return validateSimpleDate(dateString);
}

export default class AttributeEdit extends PureComponent {
  render() {
    const { onSubmit, attribute, onClose } = this.props;

    return (
      <Form
        onSubmit={data => normalize(onSubmit, data)}
        initialValues={initialValues(attribute)}
        validate={values => {
          const errors = {};

          if (!validateGedcomDate(values.event.date)) {
            errors.event = { date: 'Date is invalid' };
          }

          return errors;
        }}
        render={({ handleSubmit, pristine, submitting, values }) => {
          return (
            <Dialog
              header={<StandardDialogHeader title="Edit Person Attribute" />}
              footer={
                <div>
                  <Button type="button" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    disabled={submitting || pristine}
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              }
            >
              <form>
                <InputText name="data" label="Data: " autoFocus />
                <InputText name="event.date" label="Date: " />
                <InputText name="event.place.description" label="Place: " />
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            </Dialog>
          );
        }}
      />
    );
  }
}
