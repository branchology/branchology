import React, { PureComponent } from 'react';
import { createApiValidationError, translateApiErrors } from 'lib';
import { Button } from 'module/common/component/Button';
import { Form, InputText } from 'module/common/component/Form';
import { Dialog, StandardDialogHeader } from 'module/common/modal';
import { NotificationContext } from 'module/common/notifications';
import updatePersonNameWrapper from '../../query/nameUpdateMutation';

function initialValues(initialValue) {
  const { id, given, surname } = initialValue;
  return { id, given, surname };
}

class NameEdit extends PureComponent {
  static contextType = NotificationContext;

  submit = values => {
    return this.props
      .updatePersonName({ variables: values })
      .then(({ data: { updatePersonName: { errors, name } } }) => {
        if (errors) {
          throw createApiValidationError(translateApiErrors(errors, 'name'));
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
        onSubmit={this.submit}
        initialValues={initialValues(name)}
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

export default updatePersonNameWrapper(NameEdit);
