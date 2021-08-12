import React, { Fragment, Suspense } from 'react';
import Head from './components/HeadSection';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from '../theme';
import GlobalStyles from '../GlobalStyles';
import Pace from '../shared/components/Pace';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Pace color={theme.palette.primary.light} />
      <Suspense fallback={<Fragment />}>
        <Head />
      </Suspense>
    </MuiThemeProvider>
  );
}

export default App;
