import { useRef, useCallback } from 'react';

const useCallbackDebounce = (func, delay = 400) => {
  let debounce = useRef(null);

  return useCallback(
    (...args) => {
      const context = this;
      clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    },
    [func]
  );
};

export default useCallbackDebounce;
