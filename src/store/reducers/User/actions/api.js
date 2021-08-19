import { Axios } from '../../Axios';
import { ToogleIsLoading, SetUser } from './redux';
import { PushAlertWithTimeout } from '../../App/actions';
import { USER_LOCAL_STORAGE_KEY } from '../utils';

export const UserLogin = (payload) => (dispatch) => {
  dispatch(ToogleIsLoading(true));
  return Axios()
    .post('auth/login', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(({ data }) => {
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data));
      dispatch(ToogleIsLoading(false));
      const alertPayload = { title: 'Sign in', message: 'Welcome back!', props: { severity: 'success' } };
      dispatch(PushAlertWithTimeout(alertPayload));
      return dispatch(SetUser(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
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
      console.error(e);
    });
};
