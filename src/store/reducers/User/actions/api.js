import { Axios } from '../../Axios';
import { ToogleIsLoading, SetUser, SetUserPwas, SetUserSetting, SetUserError, ResetUserPwaForm } from './redux';
import { PushAlertWithTimeout } from '../../App/actions';
import { MergeFilterPwas } from '../../Pwas/actions/redux';
import { PostPwa } from '../../Pwas/actions/api';

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
      const alertPayload = { title: 'Sign in success', message: 'Welcome back!', props: { severity: 'success' } };
      dispatch(PushAlertWithTimeout(alertPayload));
      return dispatch(SetUser(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      dispatch(SetUserError(e));
      const alertPayload = {
        title: 'Sign in error',
        message: `${e.message}. Please check your username and password.`,
        props: { severity: 'error' }
      };
      dispatch(PushAlertWithTimeout(alertPayload));
      console.error(e);
    });
};

export const UserSignUp = (payload) => (dispatch) => {
  dispatch(ToogleIsLoading(true));
  return Axios()
    .post('auth/register/', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(({ data }) => {
      dispatch(ToogleIsLoading(false));
      const alertPayload = { title: 'Sign up success', message: 'Welcome!', props: { severity: 'success' } };
      dispatch(PushAlertWithTimeout(alertPayload));

      return dispatch(SetUser(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      dispatch(SetUserError(e));
      const alertPayload = {
        title: 'Sign up error',
        message: `${e.message}. Please check your username, email, and password.`,
        props: { severity: 'error' }
      };
      dispatch(PushAlertWithTimeout(alertPayload));
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
      // dispatch(MergeFilterPwas(data));
      return dispatch(SetUserPwas(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      dispatch(SetUserError(e));
      console.error(e);
    });
};

export const ChangeMode = (payload) => (dispatch, getState) => {
  const { id, token, setting } = getState().User;

  if (!(id && token)) {
    return dispatch(SetUser({ setting: { ...setting, ...payload } }));
  }

  return Axios({ token })
    .patch(`auth/update-settings/${setting.id}/`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      dispatch(SetUserSetting(data));
    })
    .catch((e) => {
      console.error(e);
    });
};

export const ToggleUserMode = () => (dispatch, getState) => {
  const { mode } = getState().User.setting;
  return dispatch(ChangeMode({ mode: mode === 'light' ? 'dark' : 'light' }));
};

export const PostUserPwa = () => async (dispatch, getState) => {
  const {
    id,
    pwaToUpload: { form },
    lighthouseResults
  } = getState().User;
  const shouldPublish = !!lighthouseResults;
  const payload = Object.entries(form).reduce(
    (acc, [key, { value }]) => {
      acc[key] = value;
      return acc;
    },
    { created_by: id, updated_by: id, published: shouldPublish }
  );
  return await PostPwa(payload)
    .then((data) => {
      dispatch(ResetUserPwaForm());
      return data;
    })
    .catch((e) => {
      console.error(e);
    });
};
