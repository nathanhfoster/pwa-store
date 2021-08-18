import React, { useState } from 'react';
import { connect } from 'resurrection';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import SearchBar from './NavSearchBar';
import NavMenu from './NavMenu';
import { ToggleAppNavBar } from 'store/reducers/App/actions';
import LoginButton from './Buttons/LoginLogoutButton';
import NotificationsButton from './Buttons/NotificationsButton';
import AddToHomeScreenButton from './Buttons/AddToHomeScreenButton';

const mobileMenuId = 'SearchBarMenuMobile';

const NavToolbar = ({ ToggleAppNavBar }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={ToggleAppNavBar}
          sx={{ mr: 1, display: { sm: 'none' } }}
        >
          <MenuIcon sx={{ animation: 'grow 200ms' }} />
        </IconButton>
        <SearchBar />
        <Box sx={{ flexGrow: 1 }} />
        <AddToHomeScreenButton />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <NotificationsButton />
          <LoginButton />
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='show more'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={handleMobileMenuOpen}
            color='inherit'
            sx={{ p: 0.5 }}
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <NavMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        setMobileMoreAnchorEl={setMobileMoreAnchorEl}
        mobileMenuId={mobileMenuId}
      />
    </>
  );
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = { ToggleAppNavBar };

export default connect(mapStateToProps, mapDispatchToProps)(NavToolbar);
