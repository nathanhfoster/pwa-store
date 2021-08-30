import React, { useMemo, lazy } from 'react';
import PropTypes from 'prop-types';
import { PwasType } from 'store/reducers/Pwas/types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/core/Skeleton';
import { DEFAULT_PWA_IMAGE_SIZE } from '../../constants';
import { connect } from 'resurrection';

const Pwa = lazy(() => import('./Pwa'));

const PwasStack = ({ title, subtitle, data, imageSize, flexWrap, isLoading }) => {
  const isDetailedView = flexWrap === 'wrap';

  const gridItemStyles = useMemo(
    () => ({
      xs: 6,
      sm: 4,
      md: 3,
      lg: 2,
      xl: 1,
      sx: { m: { xs: isDetailedView ? 0 : 2, sm: 2 } },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      alignContent: 'flex-start'
    }),
    [isDetailedView]
  );

  const renderPwas = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: isDetailedView ? 20 : 12 }, (_, i) => (
        <Grid item key={i} {...gridItemStyles}>
          <Skeleton variant='rectangular' width={imageSize} height={imageSize} />
        </Grid>
      ));
    }

    return data.map((pwa) => (
      <Grid item key={pwa.id} {...gridItemStyles}>
        <Pwa {...pwa} detailed={isDetailedView} imageSize={imageSize} />
      </Grid>
    ));
  }, [isDetailedView, imageSize, isLoading, data]);

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        py: 4,
        px: 0
      }}
    >
      {title && (
        <Typography variant={isDetailedView ? 'h4' : 'h6'} mx={4} mb={1}>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant='subtitle2' color='text.secondary' mx={4} mb={2}>
          {subtitle}
        </Typography>
      )}
      <Grid
        container
        sx={{
          flexWrap,
          overflow: 'auto',
          justifyContent: 'flex-start',
          alignItems: 'baseline',
          alignContent: 'flex-start'
        }}
      >
        {renderPwas}
      </Grid>
    </Box>
  );
};

PwasStack.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PwasType,
  imageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  flexWrap: PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse', 'inherit', 'initial', 'revert', 'unset'])
};

PwasStack.defaultProps = {
  data: [],
  imageSize: DEFAULT_PWA_IMAGE_SIZE,
  flexWrap: 'nowrap'
};

const mapStateToProps = (
  { Pwas: { items, filteredItems, isLoading: isLoadingFromStore } },
  { isLoading: isLoadingFromProps }
) => ({
  isLoading: isLoadingFromProps || isLoadingFromStore || items.concat(filteredItems).length === 0
});

export default connect(mapStateToProps)(PwasStack);
