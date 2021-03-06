import * as ActionTypes from './actions/types';
import { toggleBooleanReducer } from 'resurrection';

export const DEFAULT_STATE = Object.freeze({
  version: '1.0',
  isInstalled: window.matchMedia?.('(display-mode: standalone)').matches,
  navBarIsOpen: false,
  mobileMenuId: 'MobileMenu',
  mobileMoreAnchorEl: null,
  navMobileMenuIsOpen: false,
  serviceWorkerRegistration: null,
  addToHomeScreenPrompt: null,
  alerts: []
});

const App = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.APP_TOGGLE_IS_INSTALLED:
      return payload !== state.isInstalled
        ? { ...state, isInstalled: toggleBooleanReducer(state.isInstalled, payload) }
        : state;

    case ActionTypes.APP_TOGGLE_NAV_BAR:
      return payload !== state.navBarIsOpen
        ? { ...state, navBarIsOpen: toggleBooleanReducer(state.navBarIsOpen, payload) }
        : state;

    case ActionTypes.APP_TOGGLE_MOBILE_MORE_ANCHOR_EL:
      return {
        ...state,
        mobileMoreAnchorEl: payload,
        navMobileMenuIsOpen: Boolean(payload)
      };

    case ActionTypes.APP_SET_SERVICE_WORKER_REGISTERATION:
      return { ...state, serviceWorkerRegistration: payload };

    case ActionTypes.APP_SET_ADD_TO_HOME_SCREEN_PROMPT:
      return { ...state, addToHomeScreenPrompt: payload };

    case ActionTypes.APP_PUSH_ALERT:
      return { ...state, alerts: [...state.alerts, payload] };

    case ActionTypes.APP_DELETE_ALERT:
      return { ...state, alerts: state.alerts.filter((alert) => alert.id !== payload) };

    default:
      return state;
  }
};

export default App;
