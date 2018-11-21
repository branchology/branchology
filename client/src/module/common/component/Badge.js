import React from 'react';
import styled from 'styled-components';
import styledMap from 'styled-map';

const backgroundColorMap = styledMap`
  primary: #1b7bf7;
  default: #999;
`;

const Container = styled.span`
  background-color: ${backgroundColorMap};
  color: #fff;
  border-radius: 8px;
  display: inline-block;
  font-size: 0.75em;
  margin: 0 3px 0 3px;
  padding: 3px 6px;
  text-align: center;
`;

export default Container;
