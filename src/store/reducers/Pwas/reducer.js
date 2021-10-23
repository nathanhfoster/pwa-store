import * as ActionTypes from './actions/types';
import * as UserActionTypes from '../User/actions/types';
import {
  ALL_PWA_TAG,
  mergePwas,
  handleFilterItems,
  PWAS_TAGS_LOCAL_STORAGE_KEY,
  setTagsFromLocalStorage,
  getTagsFromLocalStorage
} from './utils';
import { toggleBooleanReducer } from 'resurrection';
import { omit } from 'utils';

const tags = getTagsFromLocalStorage();

export const DEFAULT_STATE = Object.freeze({
  search: { count: null, next: null, previous: null, value: '' },
  isLoading: false,
  count: null,
  next: null,
  previous: null,
  items: [],
  filteredItems: [],
  tags
});

const Pwas = (state = DEFAULT_STATE, action) => {
  const { type, search, payload } = action;
  let nextItem, nextItems;

  switch (type) {
    case ActionTypes.PWAS_TOGGLE_IS_LOADING:
      return payload !== state.isLoading
        ? {
            ...state,
            isLoading: toggleBooleanReducer(state.isLoading, payload)
          }
        : state;

    case ActionTypes.PWAS_SET:
      nextItems = mergePwas(state.items.concat(state.filteredItems), payload.results);
      return {
        ...state,
        ...omit(payload, ['results']),
        ...handleFilterItems(nextItems, search ?? state.search.value)
      };

    case ActionTypes.PWAS_SET_TAGS:
      nextItems = [{ name: ALL_PWA_TAG }, ...payload];
      setTagsFromLocalStorage(nextItems);
      return {
        ...state,
        tags: nextItems
      };

    case ActionTypes.PWAS_SET_SEARCH:
      return {
        ...state,
        search: { ...state.search, value: payload }
      };

    case ActionTypes.PWAS_SET_SEARCH_DATA:
      nextItems = mergePwas(state.items.concat(state.filteredItems), payload.results);
      return {
        ...state,
        search: { ...state.search, ...omit(payload, ['results']) },
        ...handleFilterItems(nextItems, search ?? state.search.value)
      };
    case ActionTypes.PWAS_MERGE_FILTER:
    case UserActionTypes.USER_SET_PWAS:
      nextItem = payload?.items ?? payload;
      nextItems = mergePwas(state.items.concat(state.filteredItems), nextItem);
      return {
        ...state,
        ...handleFilterItems(nextItems, search ?? state.search.value)
      };

    default:
      return state;
  }
};

export default Pwas;
