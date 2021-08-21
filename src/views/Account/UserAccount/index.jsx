import React, { useState, lazy } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';
import TabControls from './TabControls';
import Box from '@material-ui/core/Box';
import AppsIcon from '@material-ui/icons/Apps';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { connect } from 'resurrection';

const UserPwas = lazy(() => import('./UserPwas'));
const UserForm = lazy(() => import('./UserForm'));

const a11yProps = (index) => ({
  id: `account-tab-${index}`,
  'aria-controls': `account-tabpanel-${index}`
});

const UserAccount = ({
  isLoading,
  error,
  token,
  id,
  username,
  name,
  email,
  setting: { mode },
  is_active,
  is_superuser,
  is_staff,
  last_login,
  date_joined,
  error: { message }
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          indicatorColor='primary'
          textColor='inherit'
          variant='scrollable'
        >
          <Tab icon={<AppsIcon />} label='Pwas' {...a11yProps(0)} />
          <Tab icon={<AccountCircleIcon />} label='Update' {...a11yProps(1)} />
          <TabControls index={value} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserPwas />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserForm />
      </TabPanel>
    </Box>
  );
};

const mapStateToProps = ({ User }) => ({ ...User });

const mapDispatchToProps = {};

UserAccount.propTypes = {};

UserAccount.defaultProps = {
  error: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
