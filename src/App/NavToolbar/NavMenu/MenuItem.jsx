import React, { Children, memo } from 'react';
import PropTypes from 'prop-types';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const MenuItem = ({ href, to, children, ...restOfProps }) => {
  const onChildClick = Children.toArray(children).reduce((acc, child) => {
    const { onClick } = child.type((ownProps) => ownProps).props;

    if (!acc && onClick) {
      acc = onClick;
    }

    return acc;
  }, undefined);

  return (
    <MaterialMenuItem {...restOfProps} component={Link} to={href || to} onClick={onChildClick}>
      {children}
    </MaterialMenuItem>
  );
};

MenuItem.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string
};

export default memo(MenuItem);
