import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const MenuItem = ({ href, to, children, ...restOfProps }) => {
  return (
    <MaterialMenuItem {...restOfProps} component={Link} to={href || to}>
      {children}
    </MaterialMenuItem>
  );
};

MenuItem.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string
};

export default memo(MenuItem);
