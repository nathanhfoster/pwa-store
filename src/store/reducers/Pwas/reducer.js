import * as ActionTypes from './actions/types';
import { mergePwas, handleFilterItems } from './utils';
import { toggleBooleanReducer } from 'resurrection';

export const DEFAULT_STATE = {
  search: '',
  isLoading: false,
  count: null,
  next: null,
  previous: null,
  items: [],
  filteredItems: [],
  tags: []
};

const Pwas = (state = DEFAULT_STATE, action) => {
  const { type, search, payload } = action;
  let nextItems;

  switch (type) {
    case ActionTypes.PWAS_TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: toggleBooleanReducer(state.isLoading, payload)
      };

    case ActionTypes.PWAS_SET:
      nextItems = mergePwas(state.items, payload.results);
      return {
        ...state,
        count: nextItems.length,
        next: payload.next,
        previous: payload.previous,
        items: nextItems
      };

    case ActionTypes.PWAS_SET_TAGS:
      return {
        ...state,
        tags: payload
      };

    case ActionTypes.PWAS_SET_SEARCH:
      return {
        ...state,
        search: payload
      };

    case ActionTypes.PWAS_MERGE_FILTER:
      nextItems = mergePwas(state.items.concat(state.filteredItems), payload);
      return {
        ...state,
        ...handleFilterItems(nextItems, search || state.search)
      };

    default:
      return state;
  }
};

export default Pwas;
