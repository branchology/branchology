import React from 'react';
import styled from 'styled-components';

const Styles = styled.fieldset`
  border-top: 1px solid #ccc;
  border-left: none;
  border-right: none;
  border-bottom: none;

  legend {
    color: #555;
    font-size: 0.85em;
    padding: 0 7px;
  }

  & + & {
    margin-top: 20px;
  }
`;

export function FieldSet({ children, legend }) {
  return (
    <Styles>
      <legend>{legend}</legend>
      {children}
    </Styles>
  );
}
