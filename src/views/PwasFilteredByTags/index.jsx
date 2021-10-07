import React, { useEffect, useCallback, lazy } from 'react';
import { PwasType } from 'store/reducers/Pwas/types';
import connect from 'resurrection';
import { SearchPwas } from 'store/reducers/Pwas/actions/api';

const PwasStack = lazy(() => import('../../components/PwasStack'));

const PwasFilteredByTags = ({ pwas, pwaTag, SearchPwas }) => {
  const loadMoreData = useCallback(() => {
    if (pwaTag) {
      SearchPwas(pwaTag);
    }
  }, [pwaTag]);

  useEffect(() => {
    loadMoreData();
  }, [loadMoreData]);

  return <PwasStack flexWrap='wrap' title={pwaTag} data={pwas} loadMoreData={loadMoreData} />;
};

PwasFilteredByTags.propTypes = {
  pwas: PwasType
};

PwasFilteredByTags.defaultProps = {
  pwas: []
};

const mapStateToProps = ({ Pwas: { items } }, { pwaTag }) => ({
  pwas: items.filter((pwa) => pwa.tags.some((tag) => tag.name === pwaTag))
});
const mapDispatchToProps = { SearchPwas };

export default connect(mapStateToProps, mapDispatchToProps)(PwasFilteredByTags);
