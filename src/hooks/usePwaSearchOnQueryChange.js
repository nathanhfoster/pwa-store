import { useLayoutEffect } from 'react';
import { useDispatch } from 'resurrection';
import { SearchPwas } from 'store/reducers/Pwas/actions/api';
import useQuery from './useQuery';

/**
 * Fetches Pwas when the querystring in the url changes
 * @param {string} queryKey - The specific key in the querystring you want to perform the search on
 * @returns {string} - The queryString inside the url
 */
const usePwaSearchOnQueryChange = (queryKey = 'tagName') => {
  const dispatch = useDispatch();

  const query = useQuery();
  const queryString = query.get(queryKey);

  useLayoutEffect(() => {
    if (queryString) {
      dispatch(SearchPwas(queryString));
    }
  }, [queryString]);

  return queryString
};

export default usePwaSearchOnQueryChange;
