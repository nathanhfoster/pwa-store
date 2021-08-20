import React, { useState, lazy } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { connect } from 'resurrection';

const UserPwas = lazy(() => import('./UserPwas'));
const UserForm = lazy(() => import('./UserForm'));

const TabPanel = ({ value, index, children, ...other }) => (
  <div
    role='tabpanel'
    hidden={value !== index}
    id={`account-tabpanel-${index}`}
    aria-labelledby={`account-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

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
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Pwas' {...a11yProps(0)} />
          <Tab label='Update porfile' {...a11yProps(1)} />
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
