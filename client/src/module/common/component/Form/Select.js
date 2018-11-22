import React from 'react';
import Select from 'react-select';
import FieldError from './FieldError';
import Label from './Label';

const SelectWrapper = ({
  name,
  label,
  container: { errors, mergeState },
  ...props
}) => (
  <React.Fragment>
    <Label htmlFor={name}>{label}</Label>
    <Select
      id={name}
      name={name}
      onChange={selected => {
        mergeState({ [name]: selected.value });
      }}
      styles={{ control: styles => ({ ...styles, marginLeft: 5 }) }}
      {...props}
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

export default SelectWrapper;
