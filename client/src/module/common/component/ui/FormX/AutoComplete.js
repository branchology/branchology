import { Field, ErrorMessage, getIn, setIn } from 'formik';
import React from 'react';
import ReactAutocomplete from 'react-autocomplete';
import styled from 'styled-components';
import styledMap from 'styled-map';
import { rawStyles } from './Input';
import { Label } from './Label';

const InputWrapper = styled.div`
  position: relative;
  input {
    ${rawStyles}
  }
`;

const Results = styled.div`
  background-color: #fff;
  border: 1px solid #f2f2f2;
  border-radius: 3px;
  max-height: 260px;
  overflow: scroll;
  padding: 8px;
  position: absolute;
  width: 100%;
  z-index: 9000;
`;

const Result = styled.div`
  background-color: ${styledMap`
    highlighted: #efefef;
    default: #fff;
  `};
  border-radius: 3px;
  padding: 8px;
`;

const AutoComplete = ({ name, label, onSearch, values, ...props }) => (
  <Field
    name={name}
    render={({ field, form }) => {
      return (
        <>
          <Label htmlFor={field.name}>{label}</Label>
          <InputWrapper>
            <ReactAutocomplete
              getItemValue={item => item.value}
              items={values}
              renderItem={(item, highlighted) => (
                <Result highlighted={highlighted === true} key={item.id}>
                  {item.value}
                </Result>
              )}
              {...props}
              wrapperStyle={{}}
              renderMenu={items => {
                return <Results children={items} />;
              }}
              onChange={e => {
                onSearch(e.target.value);
                form.setValues(
                  setIn(form.values, name, {
                    value: e.target.value,
                    id: null,
                  }),
                );
              }}
              onSelect={(value, item) => {
                form.setValues(
                  setIn(form.values, name, {
                    id: item.id,
                    value,
                  }),
                );
              }}
              value={getIn(form.values, `${name}[value]`, '')}
            />
          </InputWrapper>
          <ErrorMessage name={name} component="div" />
        </>
      );
    }}
  />
);

export { AutoComplete };
