import { useReducer } from 'react';
import { isFunction } from 'utils';

const numberReducer = (state, action) => {
  if (typeof action === 'number') {
    return action;
  }

  if (isFunction(action)) {
    return action(state);
  }

  switch (action) {
    case 'INCREMENT':
      return state + 1;

    case 'DECREMENT':
      return state - 1;

    default:
      return state + 1;
  }
};

/**
 * Hook that returns a callback to force a rerender of a component
 * @returns {function} - Dispatch API that forces a rerender
 */
const useTriggerRerender = () => {
  const [, triggerRerender] = useReducer(numberReducer, 0);
  return triggerRerender;
};

export default useTriggerRerender;
