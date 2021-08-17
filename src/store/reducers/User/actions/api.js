import { Axios } from '../../Axios';
import { ToogleIsLoading, SetUser } from './redux';
import { PushAlertWithTimeout } from '../../App/actions';

export const UserLogin = (payload) => (dispatch) => {
  dispatch(ToogleIsLoading(true));
  return Axios({})
    .post('auth/login', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(({ data }) => {
      localStorage.setItem('User', JSON.stringify(data));
      dispatch(ToogleIsLoading(false));
      const alertPayload = { title: 'Sign in success', message: 'Welcome back!', props: { severity: 'success' } };
      dispatch(PushAlertWithTimeout(alertPayload, 3000));
      return dispatch(SetUser(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
};
