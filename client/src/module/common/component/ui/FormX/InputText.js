import { Field, ErrorMessage } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { FieldError } from './FieldError';
import { Label } from './Label';

const StyledInput = styled.input`
  line-height: 1.5;
  color: rgb(33, 37, 41);
  background-color: rgb(255, 255, 255);
  font-size: 1rem;
  display: block;
  margin: 5px;
  width: 100%;
  border-width: 1px;
  border-color: rgb(222, 226, 230);
  border-style: solid;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;

  &:focus {
    box-shadow: rgba(189, 73, 50, 0.25) 0px 0px 0px 0.2rem;
    border-color: rgb(225, 155, 142);
    outline: 0px;
  }
`;

export const InputText = ({ name, label, ...props }) => (
  <div>
    <Field
      name={name}
      render={({ field }) => (
        <>
          <Label htmlFor={field.name}>{label}</Label>
          <StyledInput id={field.name} {...field} type="text" {...props} />
        </>
      )}
    />
    <ErrorMessage name={name} component={FieldError} />
  </div>
);
