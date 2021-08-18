import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const Base = ({ children, ...restOfProps }) => <IconButton {...restOfProps}>{children}</IconButton>;

Base.defaultProps = {
  size: 'large',
  color: 'inherit'
};

export default Base;
