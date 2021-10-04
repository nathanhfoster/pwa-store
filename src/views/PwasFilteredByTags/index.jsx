import React, { useCallback, lazy } from 'react';
import { PwasType } from 'store/reducers/Pwas/types';
import connect from 'resurrection';
import usePwaSearchOnQueryChange from 'hooks/usePwaSearchOnQueryChange';
import { GetPwas } from 'store/reducers/Pwas/actions/api';

const PwasStack = lazy(() => import('../../components/PwasStack'));

const PwasFilteredByTags = ({ pwas, next, GetPwas }) => {
  const queryString = usePwaSearchOnQueryChange();

  const loadMoreData = useCallback(() => {
    if (next) {
      GetPwas(next);
    }
  }, [next]);

  return <PwasStack flexWrap='wrap' title={queryString} data={pwas} loadMoreData={loadMoreData} />;
};

PwasFilteredByTags.propTypes = {
  pwas: PwasType
};

PwasFilteredByTags.defaultProps = {
  pwas: []
};

const mapStateToProps = ({ Pwas: { items, next } }) => ({ pwas: items, next });
const mapDispatchToProps = { GetPwas };

export default connect(mapStateToProps, mapDispatchToProps)(PwasFilteredByTags);
