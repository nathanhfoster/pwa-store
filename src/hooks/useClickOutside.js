import { useCallback, useEffect, useRef } from 'react';

const useClickOutside = (callback, dependancies) => {
  const ref = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCallback = useCallback(callback, dependancies);

  useEffect(() => {
    const listener = (e) => {
      if (!ref.current?.contains(e.target)) {
        handleCallback(e);
      }
    };

    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [ref, handleCallback]);

  return ref;
};

export default useClickOutside;
