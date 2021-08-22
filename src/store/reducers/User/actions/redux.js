import * as ActionTypes from './types';
import { PushAlertWithTimeout } from '../../App/actions';

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
  return { type: ActionTypes.USER_SET_PWAS, payload: userPwas.concat(pwasFromApi) };
};

export const DeleteUser = () => (dispatch) => {
  dispatch({ type: ActionTypes.USER_DELETE });

  const alertPayload = { title: 'Sign out', message: 'Securely signed out', props: { severity: 'success' } };
  return dispatch(PushAlertWithTimeout(alertPayload));
};

export const ToogleIsLoading = (payload) => ({ type: ActionTypes.USER_TOGGLE_IS_LOADING, payload });

export const SetUserError = (payload) => ({ type: ActionTypes.USER_SET_ERROR, payload });

export const SetUserPwaForm = (name, value) => ({ type: ActionTypes.USER_SET_PWA_FORM, id: name, payload: value });
