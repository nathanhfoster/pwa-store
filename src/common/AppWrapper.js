import React from 'react';
import { ContextProvider } from 'resurrection';
import { StyledEngineProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { RootReducer } from '../store';
import RouterWrapper from './RouterWrapper';

const Appwrapper = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <CssBaseline />
    <ContextProvider name='App' reducers={RootReducer}>
      <RouterWrapper>
        {children}
      </RouterWrapper>
    </ContextProvider>
  </StyledEngineProvider>
);

export default Appwrapper;
