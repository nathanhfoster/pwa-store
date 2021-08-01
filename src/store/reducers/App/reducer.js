import * as ActionTypes from './actions/types';
import { toggleBooleanReducer } from 'resurrection';

export const DEFAULT_STATE = { version: '1.0', navBarIsOpen: false };

const App = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.APP_TOGGLE_NAV_BAR:
      return { ...state, navBarIsOpen: toggleBooleanReducer(state.navBarIsOpen, payload) };

    default:
      return state;
  }
};

export default App;
