import { darken } from 'polished';
import React from 'react';
import { Field } from 'react-final-form';
import styled from 'styled-components';

// TODO: FIXME: move to Buttons.js, consolidate + improve
const Button = styled.button`
  background-color: #3c8dbc;
  border: none;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  padding: 8px 16px;

  & + & {
    margin-left: 5px;
  }

  &:active,
  &:focus {
    background-color: darken(#3c8dbc, 10%);
    outline: none;
  }

  &:hover {
    background-color: ${darken(0.1, '#3c8dbc')};
  }

  &:disabled {
    background-color: #bbb;
    cursor: default;
  }
`;

const Label = styled.label`
  display: inline-block;
  padding: 5px;
`;

const Input = styled.input`
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

const FieldError = styled.div`
  background-color: red;
  color: white;
  margin: 5px;
  padding: 4px;
`;

const InputText = ({ name, label }) => (
  <Field name={name} format={value => (!value ? '' : value)}>
    {({ input, meta }) => {
      const fieldErrors = meta.error || meta.submitError;
      return (
        <div>
          <Label htmlFor={name}>{label}</Label>
          <Input
            error={meta.error}
            {...input}
            allowNull={true}
            id={name}
            type="text"
          />
          {meta.touched &&
            (meta.error || meta.submitError) && (
              <FieldError>
                {Array.isArray(fieldErrors)
                  ? fieldErrors.map(e => <div key={e}>{e}</div>)
                  : fieldErrors}
              </FieldError>
            )}
        </div>
      );
    }}
  </Field>
);

export { Button, InputText };
