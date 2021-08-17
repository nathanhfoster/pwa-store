import React, { useState } from 'react';
import { connect } from 'resurrection';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import SearchBar from './NavSearchBar';
import NavMenu from './NavMenu';
import { ToggleAppNavBar } from 'store/reducers/App/actions';

const mobileMenuId = 'SearchBarMenuMobile';

const NavToolbar = ({ addToHomeScreenPrompt, ToggleAppNavBar }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleInstallToHomeScreen = () => addToHomeScreenPrompt.prompt();

  return (
    <>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={ToggleAppNavBar}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <SearchBar />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
            <Badge badgeContent={4} color='error'>
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
            <Badge badgeContent={17} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size='large'
            edge={addToHomeScreenPrompt ? false : 'end'}
            aria-label='account of current user'
            aria-haspopup='true'
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
        </Box>
        {addToHomeScreenPrompt && (
          <Box>
            <IconButton
              size='large'
              edge='end'
              title='Install to home screen'
              aria-label='prompt to install pwa'
              aria-haspopup='true'
              color='inherit'
              onClick={handleInstallToHomeScreen}
            >
              <SystemUpdateIcon />
            </IconButton>
          </Box>
        )}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='show more'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={handleMobileMenuOpen}
            color='inherit'
            sx={{ p: 0 }}
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

const mapStateToProps = ({ App: { addToHomeScreenPrompt } }) => ({ addToHomeScreenPrompt });

const mapDispatchToProps = { ToggleAppNavBar };

export default connect(mapStateToProps, mapDispatchToProps)(NavToolbar);
