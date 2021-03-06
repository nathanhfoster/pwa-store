import * as ActionTypes from './types';
import { PushAlertWithTimeout } from '../../App/actions';
import { MergeFilterPwas } from '../../Pwas/actions/redux';

export const SetUser = (payload) => ({
  type: ActionTypes.USER_SET,
  payload
});

export const SetUserPwas = (pwasPageFromApi) => (dispatch, getState) => {
  const { results, ...paginationProps } = pwasPageFromApi;
  const {
    User: { id },
    Pwas: { items, filteredItems }
  } = getState();
  const userPwas = items.concat(filteredItems).filter((pwa) => pwa.id == id);
  const payload = { ...paginationProps, items: userPwas.concat(results) };
  return dispatch({ type: ActionTypes.USER_SET_PWAS, payload });
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

export const SetUserPwaFormManifest = (payload) => ({
  type: ActionTypes.USER_SET_PWA_FORM_MANIFEST,
  payload
});

export const ResetUserPwaForm = () => ({ type: ActionTypes.USER_RESET_USER_PWA_FORM });

export const SetPwaManifest = (url, payload) => ({ type: ActionTypes.USER_SET_PWA_FORM_MANIFEST, id: url, payload });

export const SetLighthouseResults = (payload) => ({ type: ActionTypes.USER_SET_LIGHTHOUSE_RESULTS, payload });

export const SetUserIsOnline = (payload) => ({ type: ActionTypes.USER_SET_IS_ONLINE, payload });

export const SetUserFavorite = (payload) => ({ type: ActionTypes.USER_SET_FAVORITE, payload });
