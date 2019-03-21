import { Field, ErrorMessage } from 'formik';
import React from 'react';
import ReactSelect from 'react-select';
import { FieldError } from './FieldError';
import { Label } from './Label';

export class Select extends React.Component {
  handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { label, name, options, ...props } = this.props;

    return (
      <div style={{ margin: '5px 0 5px 5px' }}>
        <Field
          name={name}
          render={({ field }) => (
            <>
              <Label htmlFor={field.name}>{label}</Label>
              <ReactSelect
                {...props}
                {...field}
                options={options}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </>
          )}
        />
        <ErrorMessage name={name} component={FieldError} />
      </div>
    );
  }
}
