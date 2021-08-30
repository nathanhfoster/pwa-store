import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';

const styles = {};

const Base = ({ children, ...restOfProps }) => (
  <IconButton variant='text' {...restOfProps} sx={styles}>
    {children}
  </IconButton>
);

export default memo(Base);
