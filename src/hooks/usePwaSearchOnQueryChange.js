import { useLayoutEffect } from 'react';
import { useDispatch } from 'resurrection';
import { SearchPwas } from 'store/reducers/Pwas/actions/api';
import useMounted from './useMounted';
import useQuery from './useQuery';

/**
 * Fetches Pwas when the querystring in the url changes
 * @param {string} queryKey - The specific key in the querystring you want to perform the search on
 */
const usePwaSearchOnQueryChange = (queryKey = 'tagName') => {
  const dispatch = useDispatch();
  const mounted = useMounted();
  const query = useQuery();
  const queryString = query.get(queryKey);

  useLayoutEffect(() => {
    if (mounted) {
      dispatch(SearchPwas(queryString));
    }
  }, [mounted, queryString]);
};

export default usePwaSearchOnQueryChange;
