import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #efefef;
  padding: 10px;
`;

export default ({ message = 'No Records Found.' }) => (
  <Container>{message}</Container>
);
