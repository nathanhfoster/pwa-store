import React, { useEffect, useCallback, lazy } from 'react';
import { PwasType } from 'store/reducers/Pwas/types';
import connect from 'resurrection';
import { GetPwasPage, SearchPwas } from 'store/reducers/Pwas/actions/api';
import { ALL_PWA_TAG } from 'store/reducers/Pwas/utils';

const PwasStack = lazy(() => import('../../components/PwasStack'));

const PwasFilteredByTags = ({ pwas, pwaTag, GetNextPwas }) => {
  const loadMoreData = useCallback(async () => {
    if (pwaTag) {
      await GetNextPwas(pwaTag);
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
  pwas: pwaTag === ALL_PWA_TAG ? items : items.filter((pwa) => pwa.tags.some((tag) => tag.name === pwaTag))
});
const mapDispatchToProps = { GetPwasPage, SearchPwas };

const mergeProps = (stateToProps, dispatchToProps, ownProps) => {
  const { GetPwasPage, SearchPwas } = dispatchToProps;
  const { pwaTag } = ownProps;
  return { ...stateToProps, ...ownProps, GetNextPwas: pwaTag === ALL_PWA_TAG ? GetPwasPage : SearchPwas };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PwasFilteredByTags);
