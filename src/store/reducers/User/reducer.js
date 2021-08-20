import * as ActionTypes from './actions/types';
import { toggleBooleanReducer } from 'resurrection';
import { USER_LOCAL_STORAGE_KEY } from './utils';

const localUser = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

export const DEFAULT_USER_STATE = {
  isLoading: false,
  error: {
    message: '',
    name: '',
    stack: '',
    config: {
      url: '',
      method: '',
      data: {},
      headers: {},
      baseURL: '',
      transformRequest: [],
      transformResponse: [],
      timeout: 0,
      withCredentials: true,
      adapter: '',
      responseType: '',
      xsrfCookieName: '',
      xsrfHeaderName: '',
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: ''
    }
  },
  id: null,
  token: '',
  username: '',
  name: '',
  email: '',
  setting: { mode: 'light' },
  is_active: false,
  is_superuser: false,
  is_staff: false,
  last_login: '',
  date_joined: ''
};

export const DEFAULT_STATE = localUser ? JSON.parse(localUser) : DEFAULT_USER_STATE;

const User = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  let nextItem;

  switch (type) {
    case ActionTypes.USER_TOGGLE_IS_LOADING:
      return payload !== state.isLoading
        ? {
            ...state,
            isLoading: toggleBooleanReducer(state.isLoading, payload)
          }
        : state;

    case ActionTypes.USER_SET:
      nextItem = {
        ...state,
        ...payload
      };
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(nextItem));
      return nextItem;

    case ActionTypes.USER_DELETE:
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
      return {
        ...DEFAULT_USER_STATE
      };

    case ActionTypes.USER_SET_ERROR:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
};

export default User;
