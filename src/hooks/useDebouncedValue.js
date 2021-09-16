import { useEffect, useState } from 'react';

const useDebouncedValue = (nextValue, delay = 400) => {
  const [value, setValue] = useState(nextValue);

  useEffect(() => {
    const id = setTimeout(() => setValue(nextValue), delay);
    return () => clearTimeout(id);
  }, [nextValue, delay]);

  return value;
};

export default useDebouncedValue;
