import React from 'react';
import Base from './Base';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

const NotificationsButton = ({ children }) => (
  <>
    <Base title='Notifications' aria-label='show 17 new notifications'>
      <Badge badgeContent={17} color='error'>
        <NotificationsIcon sx={{ animation: 'grow 200ms' }} />
      </Badge>
    </Base>
    {children}
  </>
);

export default NotificationsButton;
