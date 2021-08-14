import * as ActionTypes from './types';

export const ToogleIsLoading = (payload) => ({ type: ActionTypes.USER_TOGGLE_IS_LOADING, payload });

export const SetUser = (payload) => ({
  type: ActionTypes.USER_SET,
  payload
});
