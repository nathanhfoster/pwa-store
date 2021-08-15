import { useLayoutEffect } from 'react';
import { useDispatch } from 'resurrection';
import { SearchPwas } from 'store/reducers/Pwas/actions/api';
import useMounted from './useMounted';
import useQuery from './useQuery';

/**
 * Fetches Pwas when the querystring in the url changes
 * @param {string} queryKey - The specific key in the querystring you want to perform the search on
 * @returns {string} - The queryString inside the url
 */
const usePwaSearchOnQueryChange = (queryKey = 'tagName') => {
  const mounted = useMounted();
  const dispatch = useDispatch();

  const query = useQuery();
  const queryString = query.get(queryKey);

  useLayoutEffect(() => {
    if (mounted) {
      dispatch(SearchPwas(queryString));
    }
  }, [mounted, queryString]);

  return queryString
};

export default usePwaSearchOnQueryChange;
