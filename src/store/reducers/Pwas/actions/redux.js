import * as ActionTypes from './types';

export const ToogleIsLoading = (payload) => ({ type: ActionTypes.PWAS_TOGGLE_IS_LOADING, payload });

export const SetPwas = (payload) => ({
  type: ActionTypes.PWAS_SET,
  payload
});

export const SetPwasSearch = (payload) => ({ type: ActionTypes.PWAS_SET_SEARCH, payload });

export const MergeFilterPwas = (payload, search) => ({
  type: ActionTypes.PWAS_MERGE_FILTER,
  payload,
  search
});
