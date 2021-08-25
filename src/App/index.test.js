import React, { Suspense } from 'react';
import { RootReducer } from 'store';
import { ContextProvider } from 'resurrection';
import 'styles/index.css';
import { StyledEngineProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { LoadingScreen } from 'components';

import { render, screen } from '@testing-library/react';
import App from '.';

test('App renders', async () => {
  render(
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ContextProvider name='App' reducers={RootReducer}>
        <Suspense fallback={<LoadingScreen />}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </ContextProvider>
    </StyledEngineProvider>
  );
  const portalElement = await screen.findByTestId('portal-root');
  expect(portalElement).toBeInTheDocument();
});
