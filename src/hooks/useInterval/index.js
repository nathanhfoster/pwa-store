import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const useInterval = ({ callback, delay = 5000 }) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

useInterval.propTypes = {
  callback: PropTypes.func,
  delay: PropTypes.number
};

export default useInterval;
