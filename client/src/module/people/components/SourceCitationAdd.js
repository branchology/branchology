import React, { PureComponent } from 'react';
import { createApiValidationError, translateApiErrors } from 'lib';
import { Button } from 'module/common/component/Button';
import { Form, InputText, InputTextArea } from 'module/common/component/Form';
import { Dialog, StandardDialogHeader } from 'module/common/modal';
import { NotificationContext } from '../../common/notifications';
import SourceAutocomplete from './SourceAutocomplete';

class SourceCitationAdd extends PureComponent {
  static contextType = NotificationContext;

  submit = citation => {
    const { addCitation, entity } = this.props;

    return addCitation({ variables: { entityId: entity.id, citation } }).then(
      ({
        data: {
          addCitation: { entity, errors },
        },
      }) => {
        if (errors) {
          throw createApiValidationError(
            translateApiErrors(errors, 'citation'),
          );
        }
        this.props.onClose();
        this.context.notify('Citation Save!');
        return entity;
      },
    );
  };

  render() {
    const { onClose } = this.props;

    return (
      <Form
        debug
        validate={values => {
          const errors = {};

          return errors;
        }}
        prepareValuesForSubmit={({ source, sourceId, page, citation }) => {
          const prepared = { citation, page };
          if (sourceId) {
            prepared.sourceId = sourceId;
          } else if (source) {
            prepared.source = source;
          }

          return prepared;
        }}
        onSubmit={this.submit}
        render={({ container, submit }) => (
          <Dialog
            header={<StandardDialogHeader title="Add Source Citation" />}
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
            <SourceAutocomplete
              name="source"
              label="Source: "
              autoFocus
              container={container}
            />
            <InputText name="page" label="Page: " container={container} />
            <InputTextArea
              name="citation"
              label="Citation: "
              container={container}
            />
          </Dialog>
        )}
      />
    );
  }
}

export default SourceCitationAdd;
