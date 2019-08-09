import { Icon } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: 1000;

  .loading {
    background-color: #333;
    color: #fff;
    margin-top: 20px;
    padding: 10px;
  }
`;

export const LoadingGraphic = () => (
  <Container>
    <div className="loading">
      <Icon icon="clean" color="#fff" /> Loading…
    </div>
  </Container>
);
