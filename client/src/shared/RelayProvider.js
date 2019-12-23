import React from 'react';
import PropTypes from 'prop-types';

const RelayContext = React.createContext({});

const RelayProvider = ({ children }) => {
  const [relayData, storeRelayData] = React.useState({});
  const value = { relayData, storeRelayData };
  return (
    <RelayContext.Provider value={value}>
      {children}
    </RelayContext.Provider>
  );
};

const useRelays = () => {
  const context = React.useContext(RelayContext);
  if (!context) {
    throw new Error('Relay component cannot be rendered outside the component');
  }
  return context;
};

RelayProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { RelayProvider, useRelays };
