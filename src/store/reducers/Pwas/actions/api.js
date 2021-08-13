import { Axios } from '../../Axios';
import { ToogleIsLoading, SetPwas, SetPwasSearch, MergeFilterPwas } from './redux';

export const GetPwas = (pagination) => (dispatch) =>
  Axios({ pagination })
    .get(!pagination ? 'pwas' : undefined)
    .then(({ data }) => {
      return dispatch(SetPwas(data));
    })
    .catch((e) => {
      console.error(e);
    });

export const SearchPwas = (category) => (dispatch, getState) => {
  const { search } = getState().Pwas;

  if (!(category || search)) {
    dispatch(MergeFilterPwas([]));
    return Promise.reject;
  }

  dispatch(ToogleIsLoading(true));

  const query = category || search;

  return Axios()
    .get(`pwas?search=${query}`)
    .then(({ data: { results } }) => {
      dispatch(MergeFilterPwas(results, category || ''));
      dispatch(ToogleIsLoading(false));
      return results;
    })
    .catch((e) => {
      console.error(e);
    });
};
