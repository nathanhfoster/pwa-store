import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import { ToggleMobileMoreAnchorEl } from 'store/reducers/App/actions';
import { Link } from 'react-router-dom';
import { useDispatch } from 'resurrection';

const MenuItem = ({ children, ...restOfProps }) => {
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(ToggleMobileMoreAnchorEl(null));
  };

  return (
    <MaterialMenuItem {...restOfProps} component={Link} onClick={handleOnClick}>
      {children}
    </MaterialMenuItem>
  );
};

MenuItem.propTypes = {
  to: PropTypes.string
};

MenuItem.defaultProps = {
  to: ''
};

export default memo(MenuItem);
