import * as ActionTypes from './actions/types';
import { mergePwas, handleFilterItems, updatePwa } from './utils';
import { toggleBooleanReducer } from 'resurrection';

export const DEFAULT_STATE = {
  search: '',
  isLoading: false,
  count: null,
  next: null,
  previous: null,
  items: [],
  filteredItems: [],
  tags: [
    { name: 'Games' },
    { name: 'Tools' },
    { name: 'Social' },
    { name: 'News' },
    { name: 'Shopping' },
    { name: 'Food & Drink' },
    { name: 'Lifestyle' },
    { name: 'Business' },
    { name: 'Music' },
    { name: 'Sports' },
    { name: 'Education' },
    { name: 'Travel' },
    { name: 'Entertainment' },
    { name: 'Reference' },
    { name: 'Productivity' },
    { name: 'Offline' }
  ]
};

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

    case ActionTypes.PWAS_MERGE_FILTER:
      nextItems = mergePwas(state.items.concat(state.filteredItems), payload);
      return {
        ...state,
        ...handleFilterItems(nextItems, search || state.search)
      };

    case ActionTypes.PWA_ANALYTICS_COUNTER:
        const { view_count, launch_count, pwa_id } = payload;
        const { items, filteredItems } = updatePwa(state, [{ id: pwa_id }, { pwa_analytics: { view_count, launch_count } }])
        return { ...state, items, filteredItems };

    default:
      return state;
  }
};

export default Pwas;
