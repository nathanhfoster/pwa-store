import { Axios } from '../../Axios';
import { ToogleIsLoading, SetUser, SetUserError } from './redux';
import { PushAlertWithTimeout } from '../../App/actions';
import { MergeFilterPwas } from '../../Pwas/actions/redux';

export const UserLogin = (payload) => (dispatch) => {
  dispatch(ToogleIsLoading(true));
  return Axios()
    .post('auth/login/', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(({ data }) => {
      dispatch(ToogleIsLoading(false));
      const alertPayload = { title: 'Sign in', message: 'Welcome back!', props: { severity: 'success' } };
      dispatch(PushAlertWithTimeout(alertPayload));
      return dispatch(SetUser(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      dispatch(SetUserError(e));
      console.error(e);
    });
};

export const UpdateUser = (payload) => (dispatch, getState) => {
  const { id, token } = getState().User;
  dispatch(ToogleIsLoading(true));
  return Axios({ token })
    .patch(`users/${id}/`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(({ data }) => {
      dispatch(ToogleIsLoading(false));
      const alertPayload = {
        title: 'Update account success',
        message: 'Your account was successfully updated!',
        props: { severity: 'success' }
      };
      dispatch(PushAlertWithTimeout(alertPayload));
      return dispatch(SetUser(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      dispatch(SetUserError(e));
      const alertPayload = { title: 'Update account failure', message: e.message, props: { severity: 'error' } };
      dispatch(PushAlertWithTimeout(alertPayload));
      console.error(e);
    });
};

export const GetUserSettings = () => (dispatch, getState) => {
  const { id, token } = getState().User;
  if (!(id && token)) {
    return;
  }
  dispatch(ToogleIsLoading(true));
  return Axios({ token })
    .get(`users/${id}`)
    .then(({ data }) => {
      return dispatch(SetUser(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      dispatch(SetUserError(e));
      console.error(e);
    });
};

export const GetUserPwas = () => (dispatch, getState) => {
  const { id, token } = getState().User;
  if (!(id && token)) {
    return;
  }
  dispatch(ToogleIsLoading(true));
  return Axios({ token })
    .get(`users/${id}/pwas/`)
    .then(({ data }) => {
      dispatch(MergeFilterPwas(data));
      return dispatch(SetUser({ pwas: data }));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      dispatch(SetUserError(e));
      console.error(e);
    });
};

export const ChangeMode = (payload) => (dispatch, getState) => {
  const { token, setting } = getState().User;
  return Axios({ token })
    .patch(`auth/update-settings/${setting.id}`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      dispatch(SetUser({ setting: data }));
    })
    .catch((e) => {
      console.info('whats up', e);
    });
};
