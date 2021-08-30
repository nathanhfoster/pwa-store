import { useLayoutEffect } from 'react';
import { useBooleanReducer } from 'resurrection';

const useIsPwaInstalled = (defaultValue = false) => {
  const [isInstalled, toggleIsInstalled] = useBooleanReducer(defaultValue);

  useLayoutEffect(() => {
    window.addEventListener('appinstalled', toggleIsInstalled);

    return () => window.removeEventListener('appinstalled', toggleIsInstalled);
  });

  return isInstalled;
};

export default useIsPwaInstalled;
