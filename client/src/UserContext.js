import React from 'react';
import { usePersistedState } from 'lib';

export const UserContext = React.createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = usePersistedState('user');

  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ logout, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
