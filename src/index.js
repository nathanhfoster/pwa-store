import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { RootReducer } from './store';
import { ContextProvider } from 'resurrection';
import './styles/index.css';
import { StyledEngineProvider, createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { LoadingScreen } from 'components';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import serviceWorkerConfig from './serviceWorkerConfig';
import { lazyDelay } from 'utils';
import blue from '@material-ui/core/colors/blue';

const App = lazy(() => lazyDelay(import('./App'), 0));

// https://next.material-ui.com/customization/palette/
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#38b6ff',
      main: '#3498db',
      dark: '#004aad'
    },
    info: {
      main: blue[200]
    }
  }
});

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContextProvider name='App' reducers={RootReducer}>
        <Suspense fallback={<LoadingScreen />}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </ContextProvider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register(serviceWorkerConfig());
