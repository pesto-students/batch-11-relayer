import React, { useState, createRef } from 'react';
import UserContext from './UserContext';

const UserProvider = (props) => {
  const { children } = props;
  const [input, setInput] = useState(null);
  const ref = createRef();
  const refs = [];
  return (
    <UserContext.Provider value={{ refs, ref }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
