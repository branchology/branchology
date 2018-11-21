import React, { PureComponent } from 'react';
import { createApiValidationError, translateApiErrors } from 'lib';
import { Button } from 'module/common/component/Button';
import { Form, InputText } from 'module/common/component/Form';
import { NotificationContext } from 'module/common/notifications';
import { Dialog, StandardDialogHeader } from 'module/common/modal';
import nameCreateMutation from '../../query/nameCreateMutation';

class NameEdit extends PureComponent {
  static contextType = NotificationContext;

  submit = values => {
    return this.props
      .addPersonName({ variables: values })
      .then(({ data: { addPersonName: { errors, name } } }) => {
        if (errors) {
          throw createApiValidationError(translateApiErrors(errors));
        }

        this.props.onClose();
        this.context.notify('Person Name Added!');
        return name;
      });
  };

  render() {
    const { onClose } = this.props;

    return (
      <Form
        prepareValuesForSubmit={({ given, surname }) => {
          return {
            personId: this.props.name.personId,
            name: { given, surname },
          };
        }}
        onSubmit={values => {
          return this.submit(values);
        }}
        render={({ container, submit }) => (
          <Dialog
            header={<StandardDialogHeader title="Add Person Name" />}
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

export default nameCreateMutation(NameEdit);
