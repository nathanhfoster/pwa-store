import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { RootReducer } from './store';
import { ContextProvider } from 'resurrection';
import './styles/index.css';
import { StyledEngineProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { LoadingScreen } from 'components';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import serviceWorkerConfig from './serviceWorkerConfig';
import { lazyDelay } from 'utils';

const App = lazy(() => lazyDelay(import('./App'), 0));

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <CssBaseline />
    <ContextProvider name='App' reducers={RootReducer}>
      <Suspense fallback={<LoadingScreen />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </ContextProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register(serviceWorkerConfig());
