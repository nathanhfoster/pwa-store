import React, { useCallback } from 'react';
import MenuItem from './MenuItem';
import Menu from '@material-ui/core/Menu';
import { RouteMap } from 'utils';
import { ToggleMobileMoreAnchorEl } from 'store/reducers/App/actions';
import NotificationsButton from '../Buttons/NotificationsButton';
import LoginLogoutButton from '../Buttons/LoginLogoutButton';
import AccountButton from '../Buttons/AccountButton';
import ThemeButton from '../Buttons/ThemeButton';
import connect from 'resurrection';

const NavMenu = ({
  mobileMenuId,
  mobileMoreAnchorEl,
  navMobileMenuIsOpen,
  userIsLoggedIn,
  ToggleMobileMoreAnchorEl
}) => {
  const handleMobileMenuClose = useCallback(() => {
    ToggleMobileMoreAnchorEl(null);
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
        open={navMobileMenuIsOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <NotificationsButton>Notifications</NotificationsButton>
        </MenuItem>
        <MenuItem to={RouteMap.SETTINGS_USER_ACCOUNT}>
          <AccountButton>Account</AccountButton>
        </MenuItem>
        <MenuItem to={userIsLoggedIn ? undefined : RouteMap.LOGIN}>
          <LoginLogoutButton>{userIsLoggedIn ? 'Logout' : 'Login'}</LoginLogoutButton>
        </MenuItem>
        <MenuItem>
          <ThemeButton>Mode</ThemeButton>
        </MenuItem>
      </Menu>
    </>
  );
};

const mapStateToProps = ({ App: { mobileMenuId, mobileMoreAnchorEl, navMobileMenuIsOpen }, User: { id, token } }) => ({
  mobileMenuId,
  mobileMoreAnchorEl,
  navMobileMenuIsOpen,
  userIsLoggedIn: Boolean(id && token)
});

const mapDispatchToProps = { ToggleMobileMoreAnchorEl };

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
