import React from 'react';
import FieldError from './FieldError';
import Input from './Input';
import Label from './Label';

const InputText = ({
  name,
  label,
  container: { errors, getValue, mergeState },
}) => (
  <React.Fragment>
    <Label htmlFor={name}>{label}</Label>
    <Input
      id={name}
      type="text"
      name={name}
      onChange={e => {
        mergeState({ [e.target.name]: e.target.value });
      }}
      value={getValue(name)}
    />
    {name in errors && (
      <FieldError>
        {Array.isArray(errors[name])
          ? errors[name].map(e => <div key={e}>{e}</div>)
          : errors[name]}
      </FieldError>
    )}
  </React.Fragment>
);

export default InputText;
