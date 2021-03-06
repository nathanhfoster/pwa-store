import * as ActionTypes from './types';

export const ToogleIsLoading = (payload) => ({ type: ActionTypes.PWAS_TOGGLE_IS_LOADING, payload });

export const SetPwas = (payload) => ({
  type: ActionTypes.PWAS_SET,
  payload
});

export const SetPwaTags = (payload) => ({ type: ActionTypes.PWAS_SET_TAGS, payload });

export const SetPwasSearch = (payload) => ({ type: ActionTypes.PWAS_SET_SEARCH, payload });

export const SetPwasSearchData = (payload) => ({ type: ActionTypes.PWAS_SET_SEARCH_DATA, payload });

export const MergeFilterPwas = (payload, search) => ({
  type: ActionTypes.PWAS_MERGE_FILTER,
  payload,
  search
});

export const FilterPwas = (search) => MergeFilterPwas([], search);

export const ResetPwasFilter = () => FilterPwas('');

export const UpdateReduxPwa = (pwaIdWithRatings) => MergeFilterPwas([pwaIdWithRatings]);
