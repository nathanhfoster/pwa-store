import { Axios } from '../../Axios';
import axios from 'axios';
import { PushAlertWithTimeout } from '../../App/actions';
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
      dispatch(SetPwas(data));
      return data;
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
      dispatch(SetPwaTags(data));
      return data;
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
    .get(`pwas/extra/info?url=${url}`)
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
      console.log(status, lighthouseData);
      if (status === 200) {
        const { manifestUrl = `${url}/manifest.json` } =
          lighthouseData.lighthouseResult.audits['installable-manifest'].details.debugData;
        return await GetPwaManifest(manifestUrl).then(({ data: { manifest_url, manifest_json } }) => {
          return {
            ...lighthouseResponse,
            data: {
              ...lighthouseData,
              manifestUrl: manifest_url,
              manifestJson: manifest_json
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
      return data;
    })
    .catch((e) => {
      console.error(e);
      return Promise.reject(e);
    });

export const PostPwa = (payload) => (dispatch) => {
  const jsonPayload = JSON.stringify(payload);
  return Axios()
    .post('pwas', jsonPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      const alertPayload = { title: 'Posted Pwa', message: 'Successfully posted pwa', props: { severity: 'success' } };
      dispatch(PushAlertWithTimeout(alertPayload));
      dispatch(MergeFilterPwas([data]));
      return data;
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
};

export const PostRating = (payload) => (dispatch, getState) => {
  const jsonPayload = JSON.stringify(payload);
  return Axios()
    .post('pwas/post-rating/', jsonPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      const alertPayload = { title: 'Posted Rating', message: 'Successfully posted rating', props: { severity: 'success' } };
      dispatch(PushAlertWithTimeout(alertPayload));
      const { items, filteredItems } = getState().Pwas;
      const obj = items.concat(filteredItems).find((i) => i.id === payload.pwa_id);
      const newRatings = [{ ...data }, ...obj.ratings];
      dispatch(UpdateReduxPwa({ id: payload.pwa_id, ratings: newRatings }));
      return data;
    })
    .catch((e) => {
      console.log('error', e);
    });
};

export const UpdateRating = (ratingId, payload) => (dispatch, getState) => {
  const jsonPayload = JSON.stringify(payload);
  return Axios()
    .patch(`pwas/${ratingId}/patch-rating/`, jsonPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      const alertPayload = { title: 'Updated Rating', message: 'Successfully updated rating', props: { severity: 'success' } };
      dispatch(PushAlertWithTimeout(alertPayload));
      const { items, filteredItems } = getState().Pwas;
      const pwa = items.concat(filteredItems).find((i) => i.id === payload.pwa_id);
      const newRatings = pwa.ratings.map((r) => (r.id == ratingId ? { ...r, ...data } : r));
      dispatch(UpdateReduxPwa({ id: payload.pwa_id, ratings: newRatings }));
      return data;
    })
    .catch((e) => {
      console.log('error', e);
    });
};

