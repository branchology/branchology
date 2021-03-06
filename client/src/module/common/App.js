import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from 'module/common/Footer';
import Header from 'module/common/Header';
import { components } from 'module/common';
import { NotificationProvider } from 'module/common/notifications';

const {
  ui: { UiBlock },
} = components;

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

  .bp3-html-table {
    width: 100%;

    td.middle, th.middle {
      vertical-align: middle;
    }

    td.top, th.top {
      vertical-align: top;
    }

    td.right, th.right {
      text-align: right;
    }

    td.center, th.center {
      text-align: center;
    }
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
