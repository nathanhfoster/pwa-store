import React, { memo } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { RouteMap } from 'utils';
import NotificationsButton from '../Buttons/NotificationsButton';
import LoginButton from '../Buttons/LoginLogoutButton';

const NavMenu = ({ mobileMoreAnchorEl, setMobileMoreAnchorEl, mobileMenuId, handleProfileMenuOpen }) => {
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <NotificationsButton>
            <p>Notifications</p>
          </NotificationsButton>
        </MenuItem>
        <MenuItem href={RouteMap.LOGIN} component='a'>
          <LoginButton>
            <p>Account</p>
          </LoginButton>
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(NavMenu);
