import * as ActionTypes from './actions/types';
import { toggleBooleanReducer } from 'resurrection';

export const DEFAULT_STATE = {
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

    default:
      return state;
  }
};

export default User;
