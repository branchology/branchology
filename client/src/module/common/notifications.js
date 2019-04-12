import React, { Component } from 'react';
import styled from 'styled-components';
import styledMap from 'styled-map';

const bgColorMap = styledMap`
  error: #ef5753;
  success: #51d88a;
`;

const fgColorMap = styledMap`
  error: #fcebea;
  success: #e3fcec;
`;

const NotificationContext = React.createContext();

export { NotificationContext };

const NotificationContainer = styled.div`
  background-color: ${bgColorMap};
  box-sizing: border-box;
  color: ${fgColorMap};
  cursor: pointer;
  padding: 10px;
  position: fixed;
  width: 100%;
  z-index: 4000;
`;

const Notification = () => (
  <NotificationConsumer>
    {({ message, dismiss, type }) => (
      <NotificationContainer onClick={dismiss} {...{ [type]: true }}>
        {message}
      </NotificationContainer>
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
      type: '',
    };
  }

  notify = (message, type = 'success') => {
    if (this.state.timeout) {
      clearInterval(this.state.timeout);
    }

    this.setState({
      timeout: setTimeout(this.dismiss, 5000),
      message,
      type,
      isOpen: true,
    });
  };

  dismiss = () => {
    this.setState({
      timeout: null,
      message: '',
      type: '',
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
          type: this.state.type,
        }}
      >
        {this.state.isOpen && <Notification />}
        {children}
      </NotificationContext.Provider>
    );
  }
}

export const NotificationConsumer = NotificationContext.Consumer;
