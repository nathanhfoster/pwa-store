import { useState, useEffect } from 'react';

const defaultCallback = () => {};

const useOnlineStatus = (callback = defaultCallback) => {
  // Check if required functionality is present
  const isNavigatorOnLinePresent = typeof window?.navigator?.onLine === 'boolean';
  const [isAssumedStatus, setIsAssumedStatus] = useState(!isNavigatorOnLinePresent);
  // If no navigator.onLine, assume true
  const [isOnline, setIsOnline] = useState(isNavigatorOnLinePresent ? window?.navigator?.onLine : true);

  useEffect(() => {
    if (isNavigatorOnLinePresent) {
      callback(isOnline);
    } else if (isAssumedStatus) {
      callback(isAssumedStatus);
    }
  }, [isNavigatorOnLinePresent]);

  useEffect(() => {
    const handOnline = () => {
      setIsAssumedStatus(false);
      setIsOnline(true);
      callback(true);
    };

    const handleOffline = () => {
      setIsAssumedStatus(false);
      setIsOnline(false);
      callback(false);
    };

    window.addEventListener('online', handOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [callback]);

  return [isOnline, isAssumedStatus];
};

export default useOnlineStatus;
