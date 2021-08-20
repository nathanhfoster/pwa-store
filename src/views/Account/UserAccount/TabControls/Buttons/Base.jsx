import React, { memo } from 'react';
import Button from '@material-ui/core/Button';

const styles = { position: 'absolute', top: 0, bottom: 0, right: 0 };

const Base = ({ children, ...restOfProps }) => (
  <Button {...restOfProps} sx={styles}>
    {children}
  </Button>
);

export default memo(Base);
