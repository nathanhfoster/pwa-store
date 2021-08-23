import * as ActionTypes from './types';
import { getWindowDimensions } from './utils';

const DEFAULT_STATE_WINDOW = Object.freeze({
  ...getWindowDimensions()
});

const Window = (state = DEFAULT_STATE_WINDOW, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_WINDOW:
      return { ...state, ...getWindowDimensions() };

    default:
      return state;
  }
};

export default Window;
