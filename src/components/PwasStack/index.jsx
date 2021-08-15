import React, { lazy, memo } from 'react';
import PropTypes from 'prop-types';
import { PwasType } from 'store/reducers/Pwas/types';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const Pwa = lazy(() => import('./Pwa'));

const PwasStack = ({ title, subtitle, detailed, pwas, imageSize, flexWrap }) => (
  <>
    {title && (
      <Typography variant='h6' m={2}>
        {title}
      </Typography>
    )}
    {subtitle && (
      <Typography variant='subtitle2' color='text.secondary' mx={2}>
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
      {pwas.map((pwa) => (
        <Grid item key={pwa.id} xs='auto' mx={2}>
          <Pwa {...pwa} detailed={detailed} imageSize={imageSize} />
        </Grid>
      ))}
    </Grid>
  </>
);

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
  imageSize: 124,
  flexWrap: 'nowrap'
};

export default memo(PwasStack);
