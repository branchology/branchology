import { darken } from 'polished';
import styled from 'styled-components';

// TODO: FIXME: move to Buttons.js, consolidate + improve
export default styled.button`
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
