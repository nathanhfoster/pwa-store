import React, { useMemo, lazy, memo } from 'react';
import PropTypes from 'prop-types';
import { PwasType } from 'store/reducers/Pwas/types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/core/Skeleton';
import { DEFAULT_PWA_IMAGE_SIZE } from '../../constants';
import { connect } from 'resurrection';

const LENGTH_OF_SKELETON_ARRAY = { length: 8 };

const containerStyles = {
  bgcolor: 'background.paper',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  py: 2
};

const Pwa = lazy(() => import('./Pwa'));

const PwasStack = ({ title, subtitle, detailed, pwas, imageSize, flexWrap, isLoading }) => {
  const renderPwas = useMemo(() => {
    if (isLoading) {
      return Array.from(LENGTH_OF_SKELETON_ARRAY, (_, i) => (
        <Grid item key={i} xs='auto' m={2}>
          <Skeleton variant='rectangular' width={imageSize} height={imageSize} />
        </Grid>
      ));
    }

    return pwas.map((pwa) => (
      <Grid item key={pwa.id} xs='auto' mx={2}>
        <Pwa {...pwa} detailed={detailed} imageSize={imageSize} />
      </Grid>
    ));
  }, [detailed, imageSize, isLoading, pwas]);

  return (
    <Box sx={containerStyles}>
      {title && (
        <Typography variant={detailed ? 'h4' : 'h6'} mx={2} mb={1}>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant='subtitle2' color='text.secondary' mx={2} mb={2}>
          {subtitle}
        </Typography>
      )}
      <Grid
        container
        spacing={0}
        direction='row'
        justifyContent='flex-start'
        alignItems='baseline'
        sx={{ flexWrap: flexWrap, overflowX: 'auto' }}
      >
        {renderPwas}
      </Grid>
    </Box>
  );
};

PwasStack.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  detailed: PropTypes.bool,
  pwas: PwasType,
  imageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  flexWrap: PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse', 'inherit', 'initial', 'revert', 'unset'])
};

PwasStack.defaultProps = {
  detailed: false,
  imageSize: DEFAULT_PWA_IMAGE_SIZE,
  flexWrap: 'nowrap'
};

const mapStateToProps = ({ Pwas: { isLoading: isLoadingFromStore } }, { isLoading: isLoadingFromProps }) => ({
  isLoading: isLoadingFromProps || isLoadingFromStore
});

export default connect(mapStateToProps)(PwasStack);
