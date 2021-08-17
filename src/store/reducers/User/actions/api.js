import { Axios } from '../../Axios';
import { ToogleIsLoading, SetUser } from './redux';

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
      return dispatch(SetUser(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
};
