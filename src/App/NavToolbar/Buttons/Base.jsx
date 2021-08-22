import React, { cloneElement } from 'react';
import IconButton from '@material-ui/core/IconButton';

const Base = ({ children, ...restOfProps }) => (
  <IconButton {...restOfProps}>{cloneElement(children, { sx: { animation: 'grow 200ms' } })}</IconButton>
);

Base.defaultProps = {
  size: 'large',
  color: 'inherit'
};

export default Base;
