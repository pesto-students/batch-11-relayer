const initialState = {
  relayData: {
    relayName: '',
    isRunning: true,
    participantApps: [],
  },
};

const Relays = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_RELAY_DATA':
      return {
        ...state,
        relayData: {
          ...state.relayData,
          ...action.value,
        },
      };
    case 'STORE_PARTICIPANT_APP':
      return {
        ...state,
        relayData: {
          ...state.relayData,
          ...action.value,
        },
      };
    default:
      return state;
  }
};

export default Relays;
