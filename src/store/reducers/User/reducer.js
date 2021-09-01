import * as ActionTypes from './actions/types';
import * as PwaActionTypes from '../Pwas/actions/types';
import { toggleBooleanReducer } from 'resurrection';
import {
  getUserTokenAndIdLocalStorage,
  getUserModeLocalStorage,
  setUserTokenAndIdLocalStorage,
  deleteUserLocalStorage,
  setUserModeLocalStorage,
  mergeManifestWithForm
} from './utils';
import { handleFilterItems, mergePwas } from '../Pwas/utils';

const [token, id] = getUserTokenAndIdLocalStorage();

export const DEFAULT_STATE = Object.freeze({
  // Database
  token,
  id,
  username: '',
  name: '',
  email: '',
  setting: { mode: getUserModeLocalStorage() },
  is_active: false,
  is_superuser: false,
  is_staff: false,
  last_login: '',
  date_joined: '',
  // Store
  isOnline: Boolean(typeof window?.navigator?.onLine === 'boolean' ? window?.navigator?.onLine : true),
  isLoading: false,
  pwaToUpload: {
    form: {
      url: { type: 'url', autoFocus: true, label: 'Url', required: true, value: '' },
      slug: { label: 'Custom url', placeholder: 'google-photos', value: '' },
      name: { label: 'Name', required: true, value: '' },
      description: {
        type: 'textarea',
        placeholder: 'Description',
        label: 'Description',
        required: true,
        value: ''
      },
      tags: { type: 'select', multiple: true, label: 'Tags', options: [], required: true, value: [] },
      manifest_url: { type: 'url', label: 'Manifest url', required: true, value: '' },
      manifest_json: {
        type: 'textarea',
        placeholder: 'Manifest Json',
        label: 'Manifest Json',
        required: true,
        value: ''
      },
      image_url: { type: 'url', label: 'Image url', required: true, value: '' }
      // organization: { label: 'Organization', value: '' }
    },
    lighthouseResults: null
  },
  pwas: [],
  user_favorites: [],
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
});

const User = (state = DEFAULT_STATE, action) => {
  const { type, id, search, payload } = action;
  let nextItem, nextItems;

  switch (type) {
    case ActionTypes.USER_SET_IS_ONLINE:
      return payload !== state.isOnline
        ? {
            ...state,
            isOnline: toggleBooleanReducer(state.isOnline, payload)
          }
        : state;
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
      return { ...DEFAULT_STATE };

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

    case ActionTypes.USER_RESET_USER_PWA_FORM:
      return {
        ...state,
        pwaToUpload: {
           ...DEFAULT_STATE.pwaToUpload,
           form: {
             ...DEFAULT_STATE.pwaToUpload.form,
             tags: {
              ...DEFAULT_STATE.pwaToUpload.form.tags,
              options: state.pwaToUpload.form.tags.options
             }
           }
        }
      };

    case ActionTypes.USER_SET_PWA_FORM_MANIFEST:
      return {
        ...state,
        pwaToUpload: {
          ...state.pwaToUpload,
          form: mergeManifestWithForm(state.pwaToUpload.form, payload.manifest_url, payload.manifest_json)
        }
      };

    case ActionTypes.USER_SET_LIGHTHOUSE_RESULTS:
      return {
        ...state,
        pwaToUpload: {
          ...state.pwaToUpload,
          lighthouseResults: payload
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
