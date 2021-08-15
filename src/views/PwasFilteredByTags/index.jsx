import React, { lazy } from 'react';
import { PwasType } from 'store/reducers/Pwas/types';
import { connect } from 'resurrection';
import usePwaSearchOnQueryChange from 'hooks/usePwaSearchOnQueryChange';

const PwasStack = lazy(() => import('../../components/PwasStack'));

const IMAGE_SIZE = 128;

const PwasFilteredByTags = ({ pwas }) => {
  const queryString = usePwaSearchOnQueryChange();
  return (
    <PwasStack
      // TODO: need images that are 16:9
      detailed={false}
      flexWrap='wrap'
      title={queryString}
      pwas={pwas}
      imageSize={IMAGE_SIZE}
    />
  );
};

const mapStateToProps = ({ Pwas: { items } }) => ({ pwas: items });

PwasFilteredByTags.propTypes = {
  pwas: PwasType
};

PwasFilteredByTags.propTypes = {
  pwas: []
};

export default connect(mapStateToProps)(PwasFilteredByTags);
