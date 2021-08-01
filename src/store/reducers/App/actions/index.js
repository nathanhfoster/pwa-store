import * as ActionTypes from './types';

export const SetAppVersion = (version) => ({
  type: ActionTypes.APP_SET_VERSION,
  payload: version
});

export const ToggleAppNavBar = (payload) => ({ type: ActionTypes.APP_TOGGLE_NAV_BAR, payload });
