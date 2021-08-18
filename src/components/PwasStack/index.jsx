import React, { lazy, memo } from 'react';
import PropTypes from 'prop-types';
import { PwasType } from 'store/reducers/Pwas/types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DEFAULT_PWA_IMAGE_SIZE } from '../../constants';

const containerStyles = {
  bgcolor: 'background.paper',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  py: 2
};

const Pwa = lazy(() => import('./Pwa'));

const PwasStack = ({ title, subtitle, detailed, pwas, imageSize, flexWrap }) => (
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
      {pwas.map((pwa) => (
        <Grid item key={pwa.id} xs='auto' mx={2}>
          <Pwa {...pwa} detailed={detailed} imageSize={imageSize} />
        </Grid>
      ))}
    </Grid>
  </Box>
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
  imageSize: DEFAULT_PWA_IMAGE_SIZE,
  flexWrap: 'nowrap'
};

export default memo(PwasStack);