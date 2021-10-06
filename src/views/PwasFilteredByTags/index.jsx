import React, { useEffect, useCallback, lazy } from 'react';
import { PwasType } from 'store/reducers/Pwas/types';
import connect from 'resurrection';
import { GetPwas, SearchPwas } from 'store/reducers/Pwas/actions/api';

const PwasStack = lazy(() => import('../../components/PwasStack'));

const PwasFilteredByTags = ({ pwas, next, pwaTag, GetPwas, SearchPwas }) => {
  useEffect(() => {
    if (pwaTag) {
      SearchPwas(pwaTag);
    }
  }, [pwaTag]);

  const loadMoreData = useCallback(() => {
    if (next) {
      GetPwas(next);
    }
  }, [next]);

  return <PwasStack flexWrap='wrap' title={pwaTag} data={pwas} loadMoreData={loadMoreData} />;
};

PwasFilteredByTags.propTypes = {
  pwas: PwasType
};

PwasFilteredByTags.defaultProps = {
  pwas: []
};

const mapStateToProps = ({ Pwas: { items, next } }, { pwaTag }) => ({
  pwas: items.filter((pwa) => pwa.tags.some((tag) => tag.name === pwaTag)),
  next
});
const mapDispatchToProps = { GetPwas, SearchPwas };

export default connect(mapStateToProps, mapDispatchToProps)(PwasFilteredByTags);
