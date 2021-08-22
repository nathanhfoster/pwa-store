import * as ActionTypes from './actions/types';
import * as PwaActionTypes from '../Pwas/actions/types';
import { toggleBooleanReducer } from 'resurrection';
import {
  setUserTokenAndIdLocalStorage,
  deleteUserLocalStorage,
  setUserModeLocalStorage,
  USER_ID_LOCAL_STORAGE_KEY,
  USER_TOKEN_LOCAL_STORAGE_KEY,
  USER_MODE_LOCAL_STORAGE_KEY
} from './utils';
import { handleFilterItems, mergePwas } from '../Pwas/utils';

export const DEFAULT_STATE = {
  // Database
  id: parseInt(localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY)) || null,
  token: localStorage.getItem(USER_TOKEN_LOCAL_STORAGE_KEY) || '',
  username: '',
  name: '',
  email: '',
  setting: { mode: localStorage.getItem(USER_MODE_LOCAL_STORAGE_KEY) || 'light' },
  is_active: false,
  is_superuser: false,
  is_staff: false,
  last_login: '',
  date_joined: '',
  // Store
  isLoading: false,
  pwaToUpload: {
    form: {
      url: { autoFocus: true, label: 'Url', required: true, value: '' },
      name: { label: 'Name', required: true, value: '' },
      slug: { label: 'Custom url', value: '' },
      tags: { label: 'Tags', options: [], required: true, value: [] },
      image_url: { label: 'Image url', value: '' },
      short_description: { label: 'Short Description', required: true, value: '' },
      description: { label: 'Description', value: '' }
      // organization: { label: 'Organization', value: '' }
    },
    manifest: undefined
  },
  pwas: [],
  filteredPwas: [],
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
  }
};

const User = (state = DEFAULT_STATE, action) => {
  const { type, id, search, payload } = action;
  let nextItem, nextItems;

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
      setUserTokenAndIdLocalStorage(nextItem);
      setUserModeLocalStorage(nextItem.setting);
      return nextItem;

    case ActionTypes.USER_SET_SETTING:
      nextItem = {
        ...state,
        setting: { ...state.setting, ...payload }
      };
      setUserModeLocalStorage(nextItem.setting);
      return nextItem;

    case ActionTypes.USER_SET_PWAS:
      nextItems = mergePwas(state.pwas.concat(state.filteredPwas), payload);
      nextItem = handleFilterItems(nextItems, search);
      nextItem = {
        ...state,
        pwas: nextItem.items,
        filteredPwas: nextItem.filteredItems
      };
      return nextItem;

    case ActionTypes.USER_DELETE:
      deleteUserLocalStorage();
      return {
        ...DEFAULT_STATE
      };

    case ActionTypes.USER_SET_ERROR:
      return {
        ...state,
        error: payload
      };

    case ActionTypes.USER_SET_PWA_FORM:
      return {
        ...state,
        pwaToUpload: {
          ...state.pwaToUpload,
          form: {
            ...state.pwaToUpload.form,
            [id]: { ...state.pwaToUpload.form[id], value: payload }
          }
        }
      };

    case PwaActionTypes.PWAS_MERGE_FILTER:
      nextItems = state.pwas.concat(state.filteredPwas);
      nextItem = handleFilterItems(nextItems, search);
      return {
        ...state,
        pwas: nextItem.items,
        filteredPwas: nextItem.filteredItems
      };

    case PwaActionTypes.PWA_SET_MANIFEST:
      return {
        ...state,
        pwaToUpload: {
          ...state.pwaToUpload,
          manifest: payload
        }
      };

    case PwaActionTypes.PWAS_SET_TAGS:
      return {
        ...state,
        pwaToUpload: {
          ...state.pwaToUpload,
          form: {
            ...state.pwaToUpload.form,
            tags: { ...state.pwaToUpload.form.tags, options: payload }
          }
        }
      };

    default:
      return state;
  }
};

export default User;
