import { Button, ButtonGroup, Divider } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import { Backdrop } from './Backdrop';

const DialogContainer = styled.div`
  background-color: #fff;
  border-radius: 3px;
  margin: 10% auto 40px auto;
  max-width: 640px;
  text-align: left;
`;

const DialogBody = styled.div`
  padding: 20px;
`;

const DialogFooter = styled.div`
  background-color: #f2f2f2;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const DialogTitle = styled.div`
  background-color: #376ceb;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #fff;
  font-weight: 500;
  font-size: 1.25em;
  padding: 16px;
`;

const Dialog = ({ footer, title, children }) => (
  <Backdrop>
    <DialogContainer onClick={() => false}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogBody>{children}</DialogBody>
      {footer && <DialogFooter>{footer}</DialogFooter>}
    </DialogContainer>
  </Backdrop>
);

const DialogCommonFooter = ({ isSubmitting, onClose, onSubmit }) => (
  <ButtonGroup minimal={true}>
    <Button intent="danger" onClick={onClose}>
      Close
    </Button>
    <Divider />
    <Button intent="primary" onClick={onSubmit} disabled={isSubmitting}>
      Save
    </Button>
  </ButtonGroup>
);

export { Dialog, DialogCommonFooter };
