import { isNil } from 'lodash';
import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import { createApiValidationError, translateApiErrors } from 'lib';
import { Button, Form, InputText } from 'module/common/component/Form';
import { Dialog, StandardDialogHeader } from 'module/common/modal';
import { NotificationContext } from 'module/common/notifications';
import nameUpdateMutation from '../../query/nameUpdateMutation';

function initialValues(initialValue) {
  const { id, given, surname } = initialValue;
  return { id, given, surname };
}

function normalize(submit, formData) {
  const { id, ...name } = formData;

  const opts = {
    variables: { id, name },
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
      .updatePersonName(values)
      .then(({ data: { updatePersonName: { errors, name } } }) => {
        if (errors) {
          throw createApiValidationError(translateApiErrors(errors));
        }

        this.props.onClose();
        this.context.notify('Person Name Updated!');
        return name;
      });
  };

  render() {
    const { name, onClose } = this.props;

    return (
      <Form
        onSubmit={data => normalize(this.submit, data)}
        initialValues={initialValues(name)}
        validate={values => {
          const errors = {};
          // TODO FIXME
          return errors;
        }}
        prepareValuesForSubmit={({ given, surname }) => {
          return {
            id: this.props.name.id,
            name: { given, surname },
          };
        }}
        render={({ container, submit }) => (
          <Dialog
            header={<StandardDialogHeader title="Update Person Name" />}
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
            <InputText
              name="given"
              label="Given: "
              autoFocus
              container={container}
            />
            <InputText name="surname" label="Surname: " container={container} />
          </Dialog>
        )}
      />
    );
  }
}

const withGraphql = graphql(nameUpdateMutation, {
  name: 'updatePersonName',
});

export default withGraphql(NameEdit);
