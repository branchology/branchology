import React from 'react';
import ReactAutocomplete from 'react-autocomplete';
import styled from 'styled-components';
import styledMap from 'styled-map';
import FieldError from './FieldError';
import { rawStyles } from './Input';
import Label from './Label';

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
`;

const Result = styled.div`
  background-color: ${styledMap`
    highlighted: #efefef;
    default: #fff;
  `};
  border-radius: 3px;
  padding: 8px;
`;

const AutoComplete = ({
  name,
  label,
  onSearch,
  values,
  container: { errors, getValue, mergeState },
}) => (
  <>
    <Label htmlFor={name}>{label}</Label>

    <InputWrapper>
      <ReactAutocomplete
        getItemValue={item => item.label}
        items={values}
        renderItem={(item, highlighted) => (
          <Result highlighted={highlighted === true} key={item.id}>
            {item.label}
          </Result>
        )}
        value={getValue('__source__')}
        onChange={e => {
          onSearch(e.target.value);
          mergeState({
            __source__: e.target.value,
            source: e.target.value,
            sourceId: null,
          });
        }}
        onSelect={(value, item) =>
          mergeState({ sourceId: item.id, __source__: value, source: null })
        }
        wrapperStyle={{}}
        renderMenu={items => {
          return <Results children={items} />;
        }}
      />
    </InputWrapper>

    {name in errors && (
      <FieldError>
        {Array.isArray(errors[name])
          ? errors[name].map(e => <div key={e}>{e}</div>)
          : errors[name]}
      </FieldError>
    )}
  </>
);

export default AutoComplete;
