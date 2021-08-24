import React, { cloneElement } from 'react';
import Link from 'react-router-dom/Link';
import IconButton from '@material-ui/core/IconButton';

const Base = ({ children, ...restOfProps }) => (
  <IconButton component={Link} {...restOfProps}>
    {cloneElement(children, { sx: { animation: 'grow 200ms' } })}
  </IconButton>
);

Base.defaultProps = {
  size: 'large',
  color: 'inherit'
};

export default Base;
