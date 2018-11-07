import React from 'react';
import styled from 'styled-components';
import Icon from 'module/common/Icon';

const Container = styled.div`
  background-color: #f7f7f7;
  border: 1px solid #f2f2f2;
  border-radius: 2px;
  padding: 20px;
  text-align: center;
`;

export default ({ icon, message, actions }) => (
  <Container>
    <div className="message">
      <Icon icon={icon} size="3x" />
      <p>{message}</p>
      {actions}
    </div>
  </Container>
);
