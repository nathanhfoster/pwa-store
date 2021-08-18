import * as ActionTypes from './actions/types';
import { toggleBooleanReducer } from 'resurrection';
import { USER_LOCAL_STORAGE_KEY } from './utils';

const localUser = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

export const DEFAULT_USER_STATE = {
  isLoading: false,
  token: '',
  id: null,
  username: '',
  name: '',
  email: '',
  is_active: false,
  is_superuser: false,
  is_staff: false,
  last_login: '',
  date_joined: ''
};

export const DEFAULT_STATE = localUser ? JSON.parse(localUser) : DEFAULT_USER_STATE;

const User = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.USER_TOGGLE_IS_LOADING:
      return payload !== state.isLoading
        ? {
            ...state,
            isLoading: toggleBooleanReducer(state.isLoading, payload)
          }
        : state;

    case ActionTypes.USER_SET:
      return {
        ...state,
        ...payload
      };

    case ActionTypes.USER_DELETE:
      return {
        ...DEFAULT_USER_STATE
      };

    default:
      return state;
  }
};

export default User;
