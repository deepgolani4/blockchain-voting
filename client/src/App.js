import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import HomePage from './finalPage/bind';
import voting from './VotingPages/voting';
import VoterContext from './VoterContext';

function App() {
  const [voter, setVoter] = React.useState(null);

  const updateVoter = (votes) => {
    setVoter(votes);
  };

  return (
    <Router>
      <SnackbarProvider maxSnack={3}>
        <VoterContext.Provider
          value={{
            voterDetails: voter,
            setVoterDetails: updateVoter,
          }}
        >
          <Route exact path="/" component={HomePage} />
          <Route path="/voting" component={voting} />
        </VoterContext.Provider>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
