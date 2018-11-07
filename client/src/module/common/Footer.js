import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #333;
  color: #fff;
  margin-top: 20px;
  padding: 50px;
  text-align: right;
`;

export default () => (
  <Container> &copy; 2018 Branchology. All rights reserved.</Container>
);
