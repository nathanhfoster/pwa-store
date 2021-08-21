import { useEffect } from 'react';
import useCallbackDebounce from './useCallbackDebounce';
import { SetWindow } from 'store/reducers/Window/actions';
import { useDispatch } from 'resurrection';

const useWindow = () => {
  const dispatch = useDispatch();
  const dispatchSetWindow = () => dispatch(SetWindow());
  const handleResize = useCallbackDebounce(dispatchSetWindow);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default useWindow;
