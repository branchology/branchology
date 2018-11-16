import { isNil } from 'lodash';
import React, { PureComponent } from 'react';
import { Form } from 'react-final-form';
import { Button, InputText } from 'module/common/form';
import { Dialog, StandardDialogHeader } from 'module/common/modal';
import nameCreateMutation from '../query/nameCreateMutation';
import { NotificationContext } from '../../common/notifications';

function initialValues(initialValue) {
  const { id, personId, given, surname } = initialValue;
  return { id, personId, given, surname };
}

function normalize(submit, formData) {
  const { personId, ...name } = formData;

  const opts = {
    variables: { personId, name },
  };

  if (isNil(opts.variables.name.given)) {
    opts.variables.name.given = '';
  }

  if (isNil(opts.variables.name.surname)) {
    opts.variables.name.surname = '';
  }

  return submit(opts);
}

class NameEdit extends PureComponent {
  static contextType = NotificationContext;

  submit = values => {
    return this.props
      .addPersonName(values)
      .then(({ data: { addPersonName: { errors, name } } }) => {
        if (errors) {
          const mappedErrors = {};
          for (const error of errors) {
            const key = error.field.replace('name.', '');
            if (!mappedErrors[key]) {
              mappedErrors[key] = [];
            }

            mappedErrors[key].push(error.message);
          }
          return mappedErrors;
        }
        this.props.onClose();
        this.context.notify('Person Name Updated!');
        return name;
      });
  };

  render() {
    const { name = {}, onClose } = this.props;

    return (
      <Form
        onSubmit={data => normalize(this.submit, data)}
        initialValues={initialValues(name)}
        validate={values => {
          const errors = {};
          // TODO FIXME
          return errors;
        }}
        render={({
          handleSubmit,
          pristine,
          submitting,
          submitError,
          values,
        }) => {
          return (
            <Dialog
              header={<StandardDialogHeader title="Add Person Name" />}
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
                <InputText name="given" label="Given: " autoFocus />
                <InputText name="surname" label="Surname: " />

                {submitError && <div className="error">{submitError}</div>}
              </form>
            </Dialog>
          );
        }}
      />
    );
  }
}

export default nameCreateMutation(NameEdit);
