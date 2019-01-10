import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from 'module/common/Footer';
import Header from 'module/common/Header';
import UiBlock from 'module/common/UiBlock';
import { NotificationProvider } from 'module/common/notifications';
import Context from './Context';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #efefef;
    font-family: 'Roboto', serif;
  }

  a, a:visited {
    color: #18567E;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      color: #000;
      text-decoration: underline;
    }
  }

  strong {
    font-weight: 500;
  }
`;

const AppContainer = styled.div``;

export default ({ children }) => (
  <AppContainer>
    <GlobalStyle />
    <Context>
      <NotificationProvider>
        <Header />
        <UiBlock>{children}</UiBlock>
        <Footer />
      </NotificationProvider>
    </Context>
  </AppContainer>
);
