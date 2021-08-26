import * as ActionTypes from './actions/types';
import * as UserActionTypes from '../User/actions/types';
import { mergePwas, handleFilterItems } from './utils';
import { toggleBooleanReducer } from 'resurrection';

export const DEFAULT_STATE = Object.freeze({
  search: '',
  isLoading: false,
  count: null,
  next: null,
  previous: null,
  items: [],
  filteredItems: [],
  tags: [
    { name: 'Business' },
    { name: 'Communication' },
    { name: 'Education' },
    { name: 'Entertainment' },
    { name: 'Food & Drink' },
    { name: 'Games' },
    { name: 'Lifestyle' },
    { name: 'Music' },
    { name: 'News' },
    { name: 'Offline' },
    { name: 'Photography' },
    { name: 'Productivity' },
    { name: 'Reference' },
    { name: 'Shopping' },
    { name: 'Social' },
    { name: 'Sports' },
    { name: 'Themed' },
    { name: 'Tools' },
    { name: 'Travel' }
  ]
});

const Pwas = (state = DEFAULT_STATE, action) => {
  const { type, search, payload } = action;
  let nextItems;

  switch (type) {
    case ActionTypes.PWAS_TOGGLE_IS_LOADING:
      return payload !== state.isLoading
        ? {
            ...state,
            isLoading: toggleBooleanReducer(state.isLoading, payload)
          }
        : state;

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

    case UserActionTypes.USER_SET_PWAS:
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
