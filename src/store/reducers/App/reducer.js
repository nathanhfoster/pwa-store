import * as ActionTypes from './actions/types';
import { toggleBooleanReducer } from 'resurrection';

export const DEFAULT_STATE = { version: '1.0', navBarIsOpen: false, serviceWorkerRegistration: null };

const App = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.APP_TOGGLE_NAV_BAR:
      return { ...state, navBarIsOpen: toggleBooleanReducer(state.navBarIsOpen, payload) };

      case ActionTypes.APP_SET_SERVICE_WORKER_REGISTERATION:
        return {...state, serviceWorkerRegistration: payload }

    default:
      return state;
  }
};

export default App;
