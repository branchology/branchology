import React, { Component } from 'react';
import styled from 'styled-components';

const NotificationContext = React.createContext();

export { NotificationContext };

const NotificationContainer = styled.div`
  background-color: hotpink;
  box-sizing: border-box;
  cursor: pointer;
  padding: 10px;
  position: fixed;
  width: 100%;
`;

const Notification = () => (
  <NotificationConsumer>
    {({ message, dismiss }) => (
      <NotificationContainer onClick={dismiss}>{message}</NotificationContainer>
    )}
  </NotificationConsumer>
);

export class NotificationProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeout: null,
      isOpen: false,
      message: '',
    };
  }

  notify = message => {
    if (this.state.timeout) {
      clearInterval(this.state.timeout);
    }

    this.setState({
      timeout: setTimeout(this.dismiss, 5000),
      message,
      isOpen: true,
    });
  };

  dismiss = () => {
    this.setState({
      timeout: null,
      message: '',
      isOpen: false,
    });
  };

  render() {
    const { children } = this.props;

    return (
      <NotificationContext.Provider
        value={{
          notify: this.notify,
          dismiss: this.dismiss,
          message: this.state.message,
        }}
      >
        {this.state.isOpen && <Notification />}
        {children}
      </NotificationContext.Provider>
    );
  }
}

export const NotificationConsumer = NotificationContext.Consumer;
