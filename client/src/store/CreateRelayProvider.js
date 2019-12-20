import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RelayContext = React.createContext({});

const CreateRelayProvider = (props) => {
  const [relayData, setRelayData] = useState({});
  const { children } = props;

  return (
    <RelayContext.Provider value={{ relayData, setRelayData }}>
      {children}
    </RelayContext.Provider>
  );
};

CreateRelayProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export {
  RelayContext,
  CreateRelayProvider,
};
