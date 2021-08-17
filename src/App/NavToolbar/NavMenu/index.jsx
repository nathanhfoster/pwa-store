import React, { useState } from 'react';
import { connect } from 'resurrection';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';

const NavMenu = ({
  anchorEl,
  menuId,
  setAnchorEl,
  mobileMoreAnchorEl,
  setMobileMoreAnchorEl,
  mobileMenuId,
  handleProfileMenuOpen,
  addToHomeScreenPrompt
}) => {
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>

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
          <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
            <Badge badgeContent={4} color='error'>
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
            <Badge badgeContent={17} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='primary-search-account-menu'
            aria-haspopup='true'
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        {addToHomeScreenPrompt && (
          <MenuItem>
            <IconButton size='large' aria-label='prompt to install pwa' aria-haspopup='true' color='inherit'>
              <SystemUpdateIcon />
            </IconButton>
            <p>Install</p>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

const mapStateToProps = ({ App: { addToHomeScreenPrompt } }) => ({ addToHomeScreenPrompt });

export default connect(mapStateToProps)(NavMenu);
