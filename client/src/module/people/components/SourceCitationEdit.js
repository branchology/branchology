import React, { PureComponent } from 'react';
import { createApiValidationError, translateApiErrors } from 'lib';
import { Button } from 'module/common/component/Button';
import { Form, InputText, InputTextArea } from 'module/common/component/Form';
import { Dialog, StandardDialogHeader } from 'module/common/modal';
import { NotificationContext } from '../../common/notifications';
import SourceAutocomplete from './SourceAutocomplete';

function initialValues(record) {
  console.log({ record });
  const { id, citation, page, source } = record;

  const initialValues = {
    id,
    citation,
    page,
    source: null,
    sourceId: null,
    __source__: null,
  };

  if (source) {
    initialValues.source = null;
    initialValues.__source__ = source.title;
    initialValues.sourceId = source.id;
  }

  return initialValues;
}

class SourceCitationEdit extends PureComponent {
  static contextType = NotificationContext;

  submit = citation => {
    const {
      citation: { id: citationId },
      updateCitation,
    } = this.props;

    return updateCitation({ variables: { id: citationId, citation } }).then(
      ({
        data: {
          updateCitation: { entity, errors },
        },
      }) => {
        if (errors) {
          throw createApiValidationError(
            translateApiErrors(errors, 'citation'),
          );
        }
        this.props.onClose();
        this.context.notify('Citation Updated!');
        return entity;
      },
    );
  };

  render() {
    const { citation, onClose } = this.props;

    return (
      <Form
        initialValues={initialValues(citation)}
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
            header={<StandardDialogHeader title="Edit Source Citation" />}
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

export default SourceCitationEdit;
