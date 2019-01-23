import { isNil } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Badge } from './';

const ContainerStyles = styled.div`
  margin-bottom: 10px;
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.1);

  .tabBar {
    display: flex;
  }

  .tabContentContainer {
    background-color: #fff;
    padding: 10px;
  }
`;
const TabStyles = styled.div`
  border-top: 2px solid transparent;
  cursor: pointer;
  padding: 10px 15px;

  &.active,
  &:hover {
    background-color: #fff;
    border-top-color: #1b7bf7;

    ${Badge} {
      background-color: #1b7bf7;
    }
  }
`;

const TabContainer = ({ tabs = [], contents = [] }) => {
  const [selectedTab, selectTab] = useState(0);

  if (tabs.length !== contents.length) {
    throw Error('Tabs and contents must have the same length');
  }
  return (
    <ContainerStyles>
      <div className="tabBar">
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
