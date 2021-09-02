import { Axios } from '../../Axios';
import { ToogleIsLoading, SetUser, SetUserFavorite, SetUserPwas, SetUserSetting, SetUserError, ResetUserPwaForm } from './redux';
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
      const alertPayload = { title: 'Sign in success', message: 'Welcome back!', props: { severity: 'success' } };
      dispatch(PushAlertWithTimeout(alertPayload));
      dispatch(SetUser(data));
      dispatch(ToogleIsLoading(false));
      dispatch(GetUserSettings(data));
      return data;
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      dispatch(SetUserError(e));
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
      const alertPayload = { title: 'Sign up success', message: 'Welcome!', props: { severity: 'success' } };
      dispatch(PushAlertWithTimeout(alertPayload));

      dispatch(SetUser(data));
      dispatch(ToogleIsLoading(false));
      return data;
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
      const alertPayload = {
        title: 'Update account success',
        message: 'Your account was successfully updated!',
        props: { severity: 'success' }
      };
      dispatch(PushAlertWithTimeout(alertPayload));
      dispatch(SetUser(data));
      dispatch(ToogleIsLoading(false));
      return data;
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      dispatch(SetUserError(e));
      console.error(e);
    });
};

export const GetUserSettings = (userData) => (dispatch, getState) => {
  const { id, token } = userData || getState().User;
  if (!(id && token)) {
    return;
  }
  dispatch(ToogleIsLoading(true));
  return Axios({ token })
    .get(`users/${id}`)
    .then(({ data }) => {
      dispatch(SetUser(data));
      dispatch(ToogleIsLoading(false));
      return data;
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
      dispatch(SetUserPwas(data));
      dispatch(ToogleIsLoading(false));
      return data;
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

  dispatch(ToogleIsLoading(true));

  return Axios({ token })
    .patch(`auth/update-settings/${setting.id}/`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      dispatch(SetUserSetting(data));
      dispatch(ToogleIsLoading(false));
      return data;
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
  const shouldPublish = true || !!lighthouseResults;
  const payload = Object.entries(form).reduce(
    (acc, [key, { value }]) => {
      acc[key] = value;
      return acc;
    },
    { created_by: id, updated_by: id, published: shouldPublish }
  );

  dispatch(ToogleIsLoading(true));
  return await dispatch(PostPwa(payload))
    .then((data) => {
      dispatch(ResetUserPwaForm());
      dispatch(SetUserPwas([data]));
      dispatch(ToogleIsLoading(false));
      return data;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const updateFavorite = (payload) => (dispatch, getState) => {
  const { token, user_favorites } = getState().User;
  if (payload.id) {
    return Axios({ token })
      .delete(`favorites/${payload.id}/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        dispatch(SetUserFavorite(user_favorites.filter(obj => obj.id !== payload.id)));
      })
      .catch((e) => {
        console.error(e);
      });
  } else {
    return Axios({ token })
      .post('favorites/', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(({ data }) => {
        dispatch(SetUserFavorite([...user_favorites, { ...data }]));
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
