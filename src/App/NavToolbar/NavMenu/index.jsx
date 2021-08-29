import React, { useCallback } from 'react';
import MenuItem from './MenuItem';
import Menu from '@material-ui/core/Menu';
import { RouteMap } from 'utils';
import NotificationsButton from '../Buttons/NotificationsButton';
import LoginLogoutButton from '../Buttons/LoginLogoutButton';
import AccountButton from '../Buttons/AccountButton';
import ThemeButton from '../Buttons/ThemeButton';
import connect from 'resurrection';

const NavMenu = ({ mobileMoreAnchorEl, setMobileMoreAnchorEl, mobileMenuId, userIsLoggedIn }) => {
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = useCallback((e) => {
    const childButton = e.target.querySelector('button');
    if (childButton) {
      e.stopPropagation();
      childButton.click();
    }
    setMobileMoreAnchorEl(null);
  }, []);

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
        <MenuItem onClick={handleMobileMenuClose}>
          <NotificationsButton>Notifications</NotificationsButton>
        </MenuItem>
        {userIsLoggedIn && (
          <MenuItem to={RouteMap.SETTINGS_USER_PWAS} onClick={handleMobileMenuClose}>
            <AccountButton>Account</AccountButton>
          </MenuItem>
        )}
        <MenuItem to={RouteMap.LOGIN} onClick={handleMobileMenuClose}>
          <LoginLogoutButton>{userIsLoggedIn ? 'Logout' : 'Login'}</LoginLogoutButton>
        </MenuItem>
        <MenuItem onClick={handleMobileMenuClose}>
          <ThemeButton>Mode</ThemeButton>
        </MenuItem>
      </Menu>
    </>
  );
};

const mapStateToProps = ({ User: { id, token } }) => ({
  userIsLoggedIn: Boolean(id && token)
});

export default connect(mapStateToProps)(NavMenu);
