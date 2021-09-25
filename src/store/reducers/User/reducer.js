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
import { isValidManifestJsonStringOrObject, inRange, omit } from 'utils';

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
      url: {
        type: 'url',
        autoFocus: true,
        label: 'Url',
        required: true,
        value: '',
        error: (props) => !inRange(props.value, 3, 250)
      },
      manifest_url: {
        type: 'url',
        label: 'Manifest url',
        required: true,
        value: '',
        error: (props) => !inRange(props.value, 3, 250)
      },
      image_url: {
        type: 'select',
        getOptionLabelKey: 'src',
        label: 'Image url',
        required: true,
        value: { src: null },
        options: [],
        error: (props) => !inRange(props?.value?.src, 0, 250)
      },
      manifest_json: {
        type: 'textarea',
        required: true,
        value: null,
        error: (props) => !isValidManifestJsonStringOrObject(props.value)
      },
      name: {
        label: 'Name',
        required: true,
        value: null,
        error: (props) => !inRange(props?.value, 0, 250)
      },
      slug: {
        label: 'Custom url',
        placeholder: 'google-photos',
        value: '',
        error: (props) => !inRange(props?.value, 2, 50)
      },
      description: {
        type: 'textarea',
        required: true,
        value: '',
        error: (props) => !inRange(props?.value, 0, 1000)
      },
      tags: {
        type: 'select',
        multiple: true,
        label: 'Tags',
        options: [],
        required: true,
        value: [],
        error: (props) => !inRange(props?.value, 1)
      }
    },
    lighthouseResults: null
  },
  pwas: {
    count: null,
    next: null,
    previous: null,
    items: [],
    filteredItems: []
  },
  favoritePwas: { items: [], filteredItems: [] },
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
  search: ''
});

const User = (state = DEFAULT_STATE, action) => {
  const { type, id, search, payload } = action;
  let nextItem, nextItems, nextState;

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
      nextItems = mergePwas(state.favoritePwas.items.concat(state.favoritePwas.filteredItems), payload.user_favorites);
      nextItem = handleFilterItems(nextItems, state.search || search);

      nextItem = {
        ...state,
        ...omit(
          {
            ...state,
            ...payload
          },
          ['user_favorites']
        ),
        favoritePwas: {
          ...state.favoritePwas,
          items: nextItem.items,
          filteredItems: nextItem.filteredItems
        }
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
      nextItems = mergePwas(state.pwas.items.concat(state.pwas.filteredItems), payload.items);
      nextItem = handleFilterItems(nextItems, state.search || search);
      nextItem = {
        ...state,
        pwas: {
          ...state.pwas,
          count: payload.count,
          next: payload.next,
          previous: payload.previous,
          items: nextItem.items,
          filteredItems: nextItem.filteredItems
        }
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

    case PwaActionTypes.PWAS_SET_SEARCH:
      return {
        ...state,
        search: payload
      };

    case PwaActionTypes.PWAS_MERGE_FILTER:
      nextItems = state.pwas.items.concat(state.pwas.filteredItems);
      nextItem = handleFilterItems(nextItems, state.search || search);
      nextState = { ...state, pwas: { ...state.pwas, items: nextItem.items, filteredItems: nextItem.filteredItems } };
      nextItem = handleFilterItems(
        state.favoritePwas.items.concat(state.favoritePwas.filteredItems),
        state.search || search
      );

      nextState = {
        ...nextState,
        favoritePwas: {
          ...state.favoritePwas,
          items: nextItem.items,
          filteredItems: nextItem.filteredItems
        }
      };

      return nextState;

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

    case ActionTypes.USER_SET_FAVORITE:
      nextItem = handleFilterItems(payload, state.search || search);

      nextItem = {
        ...state,
        favoritePwas: {
          ...state.favoritePwas,
          items: nextItem.items,
          filteredItems: nextItem.filteredItems
        }
      };
      return nextItem;

    default:
      return state;
  }
};

export default User;
