import { Axios } from '../../Axios';
import { ToogleIsLoading, SetUser } from './redux';

export const UserLogin = (payload) => (dispatch) => {
  dispatch(ToogleIsLoading(true));
  return Axios('login/')
    .post(payload)
    .then(({ data }) => {
      dispatch(ToogleIsLoading(false));
      return dispatch(SetUser(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
};
