import { Axios } from '../../Axios';
import axios from 'axios';
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
    .then((response) => response)
    .catch((e) => {
      console.error(e);
      return Promise.reject(e);
    });

export const GetLighthouseData = (url) =>
  axios
    .request({
      url: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&category=PWA`,
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then(async (lighthouseResponse) => {
      const { status, data: lighthouseData } = lighthouseResponse;
      if (status === 200) {
        const { manifestUrl } = lighthouseData.lighthouseResult.audits['installable-manifest'].details.debugData;
        return await GetPwaManifest(manifestUrl).then(({ data: manifestData }) => {
          return {
            ...lighthouseResponse,
            data: {
              ...lighthouseData,
              manifestJson: manifestData
            }
          };
        });
      }
      return lighthouseResponse;
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

export const PostRating = (payload) => (dispatch, getState) =>
  Axios()
    .post('pwas/post-rating/', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      const { items, filteredItems } = getState().Pwas;
      const obj = items.concat(filteredItems).find((i) => i.id === payload.pwa_id);
      const newRatings = [{ ...data }, ...obj.ratings]
      dispatch(UpdateReduxPwa({ id: payload.pwa_id, ratings: newRatings }));
    })
    .catch((e) => {
      console.log('error', e);
    });
