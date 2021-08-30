import React from 'react';
import { connect } from 'resurrection';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import NavSearchBar from './NavSearchBar';
import NavMenu from './NavMenu';
import { ToggleAppNavBar, ToggleMobileMoreAnchorEl } from 'store/reducers/App/actions';
import LoginLogoutButton from './Buttons/LoginLogoutButton';
import AccountButton from './Buttons/AccountButton';
import NotificationsButton from './Buttons/NotificationsButton';
import AddToHomeScreenButton from './Buttons/AddToHomeScreenButton';
import ThemeButton from './Buttons/ThemeButton';

const NavToolbar = ({ mobileMenuId, ToggleAppNavBar, ToggleMobileMoreAnchorEl }) => {
  return (
    <>
      <Toolbar disableGutters>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={ToggleAppNavBar}
          sx={{ ml: 1, display: { sm: 'none' } }}
        >
          <MenuIcon fontSize="large" sx={{ animation: 'grow 200ms' }} />
        </IconButton>
        <NavSearchBar />
        <Box sx={{ flexGrow: 1 }} />
        <AddToHomeScreenButton />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <NotificationsButton />
          <AccountButton />
          <LoginLogoutButton />
          <ThemeButton />
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='show more'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={ToggleMobileMoreAnchorEl}
            color='inherit'
            sx={{ p: 0.5 }}
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <NavMenu />
    </>
  );
};

const mapStateToProps = ({ App: { mobileMenuId } }) => ({ mobileMenuId });

const mapDispatchToProps = { ToggleAppNavBar, ToggleMobileMoreAnchorEl };

export default connect(mapStateToProps, mapDispatchToProps)(NavToolbar);
