import axios from 'axios';

/**
 * Config global for axios/django
 */
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

const { REACT_APP_API_URL } = process.env;

const axiosDefaults = {
  baseURL: REACT_APP_API_URL,
  timeout: 0,
  xsrfHeaderName: 'X-CSRFTOKEN',
  xsrfCookieName: 'csrftoken'
};

const base = {
  Accept: 'application/json'
};

const baseHeaders = {
  ...base,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/x-www-form-urlencoded'
};

const baseFormHeaders = (payload) => ({
  ...base,
  'Accept-Language': 'en-US,en;q=0.8',
  'Content-Type': `multipart/form-data; boundary=${payload._boundary}`
});

/*
Axios request response : https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
{
  // `data` is the response that was provided by the server
  data: {},
  // `status` is the HTTP status code from the server response
  status: 200,
  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',
  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},
  // `config` is the config that was provided to `axios` for the request
  config: {},
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
*/

export const Axios = (props) => {
  const { authToken, pagination, responseType = 'json' } = props || {};

  return axios.create({
    ...axiosDefaults,
    baseURL: pagination || axiosDefaults.baseURL,
    withCredentials: true,
    responseType,
    headers: authToken
      ? {
          Authorization: `Token ${authToken}`,
          ...baseHeaders
        }
      : baseHeaders
  });
};

export const AxiosForm = (props) => {
  const { authToken, payload } = props || {};

  return axios.create({
    ...axiosDefaults,
    headers: authToken
      ? {
          Authorization: `Token ${authToken}`,
          ...baseFormHeaders(payload)
        }
      : baseFormHeaders(payload)
  });
};

export const AxiosData = (authToken, payload) =>
  axios.create({
    ...axiosDefaults,
    withCredentials: authToken ? true : false,
    headers: authToken
      ? {
          Authorization: `Token ${authToken}`,
          ...baseHeaders
        }
      : baseHeaders,
    data: payload
  });
