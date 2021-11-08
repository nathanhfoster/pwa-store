import React, { useCallback } from 'react';
import { PwasType } from 'store/reducers/Pwas/types';
import { connect } from 'resurrection';
import { GetPwas } from 'store/reducers/Pwas/actions/api';
import dynamic from 'next/dynamic';

const PwasStack = dynamic(() => import('../../components/PwasStack'), { ssr: false });

const PwasFilteredByTags = ({ queryString, pwas, next, GetPwas }) => {
  const loadMoreData = useCallback(() => {
    if (next) {
      GetPwas(next);
    }
  }, [next]);

  return (
    <PwasStack
      flexWrap='wrap'
      title={queryString}
      data={pwas}
      loadMoreData={loadMoreData}
    />
  );
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
