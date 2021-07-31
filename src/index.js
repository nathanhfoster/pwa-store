import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { RootStoreContext, RootReducer } from './store';
import { storeFactory, ContextProvider } from 'resurrection';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LoadingScreen } from 'components';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider reducers={RootReducer} context={RootStoreContext}>
      <Suspense fallback={<LoadingScreen />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const store = storeFactory.getStore(RootStoreContext);

serviceWorker.register(serviceWorker.serviceWorkerConfig(store));
