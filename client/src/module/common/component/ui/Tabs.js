import { isNil } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Badge } from './';

const ContainerStyles = styled.div`
  margin-bottom: 10px;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 0 0 rgba(16, 22, 26, 0),
    0 1px 1px rgba(16, 22, 26, 0.2);
  border-radius: 3px;

  .tabBar {
    align-items: center;
    display: flex;

    .tabs {
      display: flex;
      flex: 1;
    }

    .action {
      margin-right: 10px;
    }
  }

  .tabContentContainer {
    background-color: #fff;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 10px;
  }
`;

const TabStyles = styled.div`
  border-top: 2px solid transparent;
  cursor: pointer;
  padding: 10px 15px;

  &:first-child {
    border-top-left-radius: 3px;
  }

  &.active,
  &:hover {
    background-color: #fff;
    /* border-top-color: #1b7bf7; */

    ${Badge} {
      background-color: #1b7bf7;
    }
  }
`;

const TabContainer = ({ action = null, tabs = [], contents = [] }) => {
  const [selectedTab, selectTab] = useState(0);

  if (tabs.length !== contents.length) {
    throw Error('Tabs and contents must have the same length');
  }
  return (
    <ContainerStyles>
      <div className="tabBar">
        <div className="tabs">
          {tabs.map(({ label, count }, index) => (
            <Tab
              label={label}
              count={count}
              key={index}
              onClick={() => selectTab(index)}
              className={index === selectedTab ? 'active' : ''}
            />
          ))}
        </div>
        <div className="action">{action}</div>
      </div>
      <div className="tabContentContainer">{contents[selectedTab]}</div>
    </ContainerStyles>
  );
};

const Tab = ({ count, label, ...props }) => (
  <TabStyles {...props}>
    {label} {!isNil(count) && <Badge>{count}</Badge>}
  </TabStyles>
);

export { TabContainer, Tab };
