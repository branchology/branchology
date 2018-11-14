import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from 'module/common/Footer';
import Header from 'module/common/Header';
import UiBlock from 'module/common/UiBlock';
import { NotificationProvider } from 'module/common/notifications';

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
    /* background-image: url('https://www.toptal.com/designers/subtlepatterns/patterns/christmas-colour.png'); */
    font-family: 'Roboto', serif;
  }

  a, a:visited {
    color: #18567E;
    font-weight: 500;
    text-decoration: none;
  }

  strong {
    font-weight: 500;
  }
`;

const AppContainer = styled.div``;

export default ({ children }) => (
  <AppContainer>
    <GlobalStyle />
    <NotificationProvider>
      <Header />
      <UiBlock>{children}</UiBlock>
      <Footer />
    </NotificationProvider>
  </AppContainer>
);
