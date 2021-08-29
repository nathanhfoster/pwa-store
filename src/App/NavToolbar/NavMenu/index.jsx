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

  const handleMobileMenuClose = useCallback(() => {
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
          <NotificationsButton>
            <p>Notifications</p>
          </NotificationsButton>
        </MenuItem>
        {userIsLoggedIn && (
          <MenuItem to={RouteMap.SETTINGS_USER_PWAS} onClick={handleMobileMenuClose}>
            <AccountButton>
              <p>Account</p>
            </AccountButton>
          </MenuItem>
        )}
        <MenuItem to={RouteMap.LOGIN} onClick={handleMobileMenuClose}>
          <LoginLogoutButton>
            <p>{userIsLoggedIn ? 'Logout' : 'Login'}</p>
          </LoginLogoutButton>
        </MenuItem>
        <MenuItem onClick={handleMobileMenuClose}>
          <ThemeButton>
            <p>Mode</p>
          </ThemeButton>
        </MenuItem>
      </Menu>
    </>
  );
};

const mapStateToProps = ({ User: { id, token } }) => ({
  userIsLoggedIn: Boolean(id && token)
});

export default connect(mapStateToProps)(NavMenu);
