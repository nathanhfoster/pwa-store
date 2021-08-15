import React, { lazy } from 'react';
import { PwasType } from 'store/reducers/Pwas/types';
import Box from '@material-ui/core/Box';
import { connect } from 'resurrection';
import usePwaSearchOnQueryChange from 'hooks/usePwaSearchOnQueryChange';

const PwasStack = lazy(() => import('../../components/PwasStack'));

const IMAGE_SIZE = 128;

const PwasFilteredByTags = ({ pwas = [] }) => {
  usePwaSearchOnQueryChange();
  return (
    <Box px={{ sm: 3 }}>
      <PwasStack
        // TODO: need images that are 16:9
        detailed={false}
        flexWrap='wrap'
        title='Featured apps'
        subtitle='Our favorite Progressive Web Apps'
        pwas={pwas}
        imageSize={IMAGE_SIZE}
      />
    </Box>
  );
};

const mapStateToProps = ({ Pwas: { items } }) => ({ pwas: items });

PwasFilteredByTags.propTypes = {
  pwas: PwasType
};

export default connect(mapStateToProps)(PwasFilteredByTags);
