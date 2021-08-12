import React from 'react';

const VoterContext = React.createContext({
  voterDetails: {},
  setVoterDetails: () => {},
});

export default VoterContext;
