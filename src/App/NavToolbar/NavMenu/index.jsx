import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { RouteMap } from 'utils';
import NotificationsButton from '../Buttons/NotificationsButton';
import LoginLogoutButton from '../Buttons/LoginLogoutButton';
import AccountButton from '../Buttons/AccountButton';
import ThemeButton from '../Buttons/ThemeButton';
import { connect } from 'resurrection';

const NavMenu = ({ mobileMoreAnchorEl, setMobileMoreAnchorEl, mobileMenuId, userIsLoggedIn }) => {
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
        {userIsLoggedIn && (
          <MenuItem href={RouteMap.ACCOUNT} component='a'>
            <AccountButton>
              <p>Account</p>
            </AccountButton>
          </MenuItem>
        )}
        <MenuItem href={RouteMap.LOGIN} component='a'>
          <LoginLogoutButton>
            <p>{userIsLoggedIn ? 'Logout' : 'Login'}</p>
          </LoginLogoutButton>
        </MenuItem>
        <MenuItem>
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
