import { darken } from 'polished';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from './Icon';
import UiBlock from './UiBlock';

const Heading = styled.div`
  align-items: center;
  color: #333;
  display: flex;
  margin-bottom: 10px;
  padding: 20px;

  h1 {
    font-weight: 400;
    margin: 0;
    padding: 0;
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
      <h1>
        <Icon icon={['fal', 'leaf']} flip="horizontal" color="#333" />{' '}
        Branchology
      </h1>

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
