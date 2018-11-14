import React from 'react';
import { darken } from 'polished';
import styled from 'styled-components';
import styledMap from 'styled-map';
import Icon from './Icon';

const danger = '#dd3245';
const primary = '#0077fa';
const success = '#22A94D';

const statusBackgroundColors = styledMap`
  danger: ${danger};
  primary: ${primary};
  success: ${success};
`;

const darkerStatusBackgroundColors = styledMap`
  danger: ${darken(0.2, danger)};
  primary: ${darken(0.2, primary)}
  success: ${darken(0.2, success)};
`;

const fontSizes = styledMap`
  sm: 9pt;
  md: 10pt;
  lg: 11pt;
  default: 10pt;
`;

const padding = styledMap`
  sm: 3px 6px;
  default: 5px 10px;
`;

const ButtonContainer = styled.button`
  background-color: ${statusBackgroundColors};
  border: 1px solid ${statusBackgroundColors};
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  font-size: ${fontSizes};
  padding: ${padding};

  & + & {
    margin-left: 4px;
  }

  span {
    padding-left: 5px;
    text-shadow: ${darkerStatusBackgroundColors} 1px 1px 1px;
  }

  &:focus {
    outline: none;
  }

  &:active,
  &:hover {
    background-color: ${darkerStatusBackgroundColors};
    border: 1px solid ${darkerStatusBackgroundColors};

    .icon {
      color: #fff;
    }
  }

  .icon {
    color: #fff;
  }
`;

export const Button = ({ children, ...props }) => (
  <ButtonContainer {...props}>
    <span>{children}</span>
  </ButtonContainer>
);

export const IconButton = ({ children, icon, ...props }) => (
  <ButtonContainer {...props}>
    <Icon className="icon" icon={icon} />
    <span>{children}</span>
  </ButtonContainer>
);
