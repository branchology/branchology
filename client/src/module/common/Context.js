import React from 'react';

export const AppContext = React.createContext();

class Context extends React.Component {
  state = { user: null, token: null };

  componentDidMount() {
    const storedState = localStorage.getItem('appContext');
    if (storedState) {
      this.setState(JSON.parse(storedState));
    }
  }

  componentWillUnmount() {
    this.persist();
  }

  isAuthenticated = () => {
    if (this.state.user === null || this.state.token === null) {
      return false;
    }

    const tokenExpires = new Date(this.state.token.expires);
    if (tokenExpires < new Date()) {
      this.setState({ user: null, token: null }, () => this.persist());
    }

    return true;
  };

  logout = () => {
    localStorage.removeItem('appContext');
    this.setState({ user: null, token: null });
  };

  setToken = ({ user, ...token }) => {
    this.setState({ user, token });
    this.persist();
  };

  persist = () => {
    localStorage.setItem('appContext', JSON.stringify(this.state));
  };

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          isAuthenticated: this.isAuthenticated,
          logout: this.logout,
          setToken: this.setToken,
          user: this.state.user,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default Context;
