import { Axios } from '../../Axios';
import {
  ToogleIsLoading,
  SetPwas,
  SetPwaTags,
  UpdateReduxPwa,
  SetPwasSearch,
  MergeFilterPwas,
  FilterPwas
} from './redux';

export const GetPwas = (pagination) => (dispatch) => {
  dispatch(ToogleIsLoading(true));
  return Axios({ pagination })
    .get(!pagination ? 'pwas' : undefined)
    .then(({ data }) => {
      dispatch(ToogleIsLoading(false));
      return dispatch(SetPwas(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
};

export const GetPwaTags = () => (dispatch) => {
  dispatch(ToogleIsLoading(true));
  return Axios()
    .get('tags')
    .then(({ data }) => {
      dispatch(ToogleIsLoading(false));
      return dispatch(SetPwaTags(data));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
};

export const SearchPwas = (category) => (dispatch, getState) => {
  const { search } = getState().Pwas;

  if (!(category || search)) {
    dispatch(FilterPwas());
    return Promise.reject;
  }

  dispatch(ToogleIsLoading(true));

  const query = category || search;

  return Axios()
    .get(`pwas?search=${query}`)
    .then(({ data: { results } }) => {
      dispatch(MergeFilterPwas(results, category || ''));
      dispatch(ToogleIsLoading(false));
      return results;
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
};

export const GetPwaManifest = (url) =>
  Axios()
    .get(`pwas/get-manifest?url=${url}`)
    .then(({ data }) => {
      // TODO: put this is a reducer
      console.log(data);
      return Promise.resolve(data);
    })
    .catch((e) => {
      console.error(e);
      return Promise.reject(e);
    });

export const UpdateAnalytics = (payload) => (dispatch) =>
  Axios()
    .patch('pwas/analytics-counter/', payload)
    .then(({ data }) => {
      dispatch(UpdateReduxPwa(data));
    })
    .catch((e) => {
      console.error(e);
      return Promise.reject(e);
    });

export const PostPwa = (payload) => (dispatch) =>
  Axios()
    .post('pwas')
    .then(({ data }) => {
      dispatch(MergeFilterPwas([data]));
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
