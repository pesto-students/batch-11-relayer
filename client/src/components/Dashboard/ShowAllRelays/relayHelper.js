/* eslint-disable no-tabs */
import React from 'react';
import * as icons from '../../../assets/icons';

const RelayState = ({ relay }) => {
  if (relay.isRunning) {
    return (
      <p>
				Running &nbsp; &nbsp;
        <img src={icons.tick} alt="relay-state-running" />
      </p>
    );
  }
  return (
    <p>
			Paused &nbsp; &nbsp;
      <img src={icons.pause} alt="relay-state-paused" />
    </p>
  );
};

const RelayAppIcon = ({ relay, index }) => {
  let appName = '';
  if ('participantApps' in relay) {
    appName = relay.participantApps[index].appName.toLowerCase();
    if (appName === 'slack') {
      return <img src={icons.slack} alt="relay-app-slack" />;
    }
    if (appName === 'github') {
      return <img src={icons.github} alt="relay-app-github" />;
    }
    return <img src={icons.app} alt="app" />;
  }
  return <div />;
};

const RelayAction = ({ relay }) => {
  return (
    <>
      <RelayAppIcon relay={relay} index={0} />
			&nbsp; &nbsp; &nbsp;
      <img src={icons.righthand} alt="relay-action" />
      &nbsp; &nbsp; &nbsp;
      <RelayAppIcon relay={relay} index={1} />
    </>
  );
};

export { RelayAction, RelayState };
