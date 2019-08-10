import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Popover,
} from '@blueprintjs/core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { components } from 'module/common';

const { WithUser } = components;

export default withRouter(({ history }) => (
  <Navbar>
    <NavbarGroup align="left">
      <NavbarHeading>Branchology</NavbarHeading>
    </NavbarGroup>
    <NavbarGroup align="right">
      <Button
        minimal
        icon="home"
        intent="success"
        text="Home"
        onClick={() => history.push('/')}
      />
      <Button
        minimal
        icon="people"
        intent="success"
        text="People"
        onClick={() => history.push('/people')}
      />
      <Button
        minimal
        icon="map-marker"
        intent="success"
        text="Places"
        onClick={() => history.push('/places')}
      />
      <Button
        minimal
        icon="book"
        intent="success"
        text="Sources"
        onClick={() => history.push('/sources')}
      />
      <NavbarDivider />
      <Button minimal icon="notifications" />
      <Popover
        content={
          <WithUser>
            {({ logout, user }) => (
              <Menu>
                <p>HELLO, {user.user.email}</p>
                <MenuItem icon="user" text="Profile" />
                <MenuItem icon="cog" text="Settings" />
                <MenuDivider />
                <MenuItem icon="log-out" text="Log Out" onClick={logout} />
              </Menu>
            )}
          </WithUser>
        }
      >
        <Button minimal icon="user" />
      </Popover>
    </NavbarGroup>
  </Navbar>
));
