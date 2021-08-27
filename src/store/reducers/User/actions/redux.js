import * as ActionTypes from './types';
import { PushAlertWithTimeout } from '../../App/actions';
import { MergeFilterPwas } from '../../Pwas/actions/redux';

export const SetUser = (payload) => ({
  type: ActionTypes.USER_SET,
  payload
});

export const SetUserPwas = (pwasFromApi) => (dispatch, getState) => {
  const {
    User: { id },
    Pwas: { items, filteredItems }
  } = getState();
  const userPwas = items.concat(filteredItems).filter((pwa) => pwa.id == id);
  return dispatch({ type: ActionTypes.USER_SET_PWAS, payload: userPwas.concat(pwasFromApi) });
};

export const DeleteUser = () => (dispatch) => {
  dispatch({ type: ActionTypes.USER_DELETE });

  const alertPayload = { title: 'Sign out', message: 'Securely signed out', props: { severity: 'success' } };
  return dispatch(PushAlertWithTimeout(alertPayload));
};

export const ToogleIsLoading = (payload) => ({ type: ActionTypes.USER_TOGGLE_IS_LOADING, payload });

export const SetUserError = (payload) => ({ type: ActionTypes.USER_SET_ERROR, payload });

export const SetUserSetting = (payload) => ({ type: ActionTypes.USER_SET_SETTING, payload });

export const SetUserPwaForm = (name, value) => ({ type: ActionTypes.USER_SET_PWA_FORM, id: name, payload: value });

export const ResetUserPwaForm = () => ({ type: ActionTypes.USER_RESET_USER_PWA_FORM });

export const SetPwaManifest = (url, payload) => ({ type: ActionTypes.USER_SET_PWA_FORM_MANIFEST, id: url, payload });

export const SetLighthouseResults = (payload) => ({ type: ActionTypes.USER_SET_LIGHTHOUSE_RESULTS, payload });

export const SetUserIsOnline = (payload) => ({ type: ActionTypes.USER_SET_IS_ONLINE, payload });
