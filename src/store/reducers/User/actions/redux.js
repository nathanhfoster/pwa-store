import * as ActionTypes from './types';
import { PushAlertWithTimeout } from '../../App/actions';

export const SetUser = (payload) => ({
  type: ActionTypes.USER_SET,
  payload
});

export const DeleteUser = () => (dispatch) => {
  dispatch({ type: ActionTypes.USER_DELETE });

  const alertPayload = { title: 'Sign out', message: 'Securely signed out', props: { severity: 'success' } };
  return dispatch(PushAlertWithTimeout(alertPayload));
};

export const ToogleIsLoading = (payload) => ({ type: ActionTypes.USER_TOGGLE_IS_LOADING, payload });

export const SetUserError = (payload) => ({ type: ActionTypes.USER_SET_ERROR, payload });
