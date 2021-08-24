import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import IconButton from '@material-ui/core/IconButton';

const Base = ({ href, to, children, ...restOfProps }) => (
  <IconButton component={Link} {...restOfProps} to={href || to}>
    {cloneElement(children, { sx: { animation: 'grow 200ms' } })}
  </IconButton>
);

Base.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string
};

Base.defaultProps = {
  href: '',
  to: '',
  size: 'large',
  color: 'inherit'
};

export default Base;
