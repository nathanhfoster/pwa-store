import * as ActionTypes from './types';
import { DEFAULT_ALERT_TIMEOUT, getReduxAlertId } from '../utils';

export const SetAppVersion = (version) => ({
  type: ActionTypes.APP_SET_VERSION,
  payload: version
});

export const ToggleAppNavBar = (payload) => ({ type: ActionTypes.APP_TOGGLE_NAV_BAR, payload });

export const ToggleMobileMoreAnchorEl = (event) => ({
  type: ActionTypes.APP_TOGGLE_MOBILE_MORE_ANCHOR_EL,
  payload: event?.currentTarget || null
});

export const SetServiceWorkerRegistration = (payload) => ({
  type: ActionTypes.APP_SET_SERVICE_WORKER_REGISTERATION,
  payload
});

export const SetAddToHomeScreenPrompt = (payload) => ({
  type: ActionTypes.APP_SET_ADD_TO_HOME_SCREEN_PROMPT,
  payload
});

export const PromptAddToHomeScreenPrompt = () => (dispatch, getState) => {
  const { addToHomeScreenPrompt } = getState().App;

  addToHomeScreenPrompt.prompt();
};

export const PushAlert = (payload, id = getReduxAlertId()) => ({
  type: ActionTypes.APP_PUSH_ALERT,
  payload: { id, ...payload }
});

export const DeleteAlert = (id) => ({ type: ActionTypes.APP_DELETE_ALERT, payload: id });

export const PushAlertWithTimeout =
  (payload, time = DEFAULT_ALERT_TIMEOUT) =>
  (dispatch) => {
    const id = getReduxAlertId();

    dispatch(PushAlert(payload, id));

    if (time) {
      setTimeout(() => dispatch(DeleteAlert(id)), time);
    }

    return Promise.resolve({ id, ...payload });
  };
