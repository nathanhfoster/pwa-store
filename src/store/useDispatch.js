import RootStoreContext from './context';
import { useDispatch } from 'resurrection';

const useRootDispatch = () => useDispatch(RootStoreContext);

export default useRootDispatch;
