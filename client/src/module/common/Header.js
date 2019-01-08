import { darken } from 'polished';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UiBlock from './UiBlock';

const Heading = styled.div`
  align-items: center;
  color: #333;
  display: flex;
  padding: 20px 0 10px 0;

  h1 {
    font-weight: 400;
    margin: 0;
    padding: 0;
  }

  .logo {
    max-height: 60px;
  }

  .menu {
    flex: 1;
    text-align: right;

    .link,
    .link:visited {
      background-color: #1aaa54;
      border-radius: 3px;
      color: #fff;
      font-size: 0.9em;
      font-weight: 400;
      padding: 5px 10px;

      + .link {
        margin-left: 10px;
      }

      &:hover {
        background-color: ${darken(0.1, '#1aaa54')};
      }
    }
  }
`;

export default () => (
  <UiBlock>
    <Heading>
      <img src="/branchology-logo.png" className="logo" />

      <div className="menu">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/people">
          People
        </Link>
        <Link className="link" to="/places">
          Places
        </Link>
        <Link className="link" to="/sources">
          Sources
        </Link>
      </div>
    </Heading>
  </UiBlock>
);
