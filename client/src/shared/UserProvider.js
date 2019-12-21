import React from 'react';

const UserContext = React.createContext();

const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useCount must be used within a UserProvider');
  }
  return context;
};

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  // const value = React.useMemo(() => [user, setUser], [user]);
  // const value = { user, setUser };
  const value = { user, setUser };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, useUser };
