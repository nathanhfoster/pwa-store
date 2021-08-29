import React, { useState, lazy } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Conditional from 'components/Conditional';
import TabControls from './TabControls';
import Box from '@material-ui/core/Box';
import AppsIcon from '@material-ui/icons/Apps';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { RouteMap } from 'utils';
import { connect } from 'resurrection';

const UserPwas = lazy(() => import('./UserPwas'));
const UserForm = lazy(() => import('./UserForm'));

const UserAccount = ({ isMobile, history }) => {
  const { pathname } = history.location;
  const [route, setRoute] = useState(pathname);

  const handleChange = (e, newValue) => {
    setRoute(newValue);
    history.push(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={route}
          onChange={handleChange}
          aria-label='basic tabs example'
          indicatorColor='primary'
          textColor='inherit'
          variant={isMobile ? 'fullWidth' : 'scrollable'}
        >
          <Tab id={RouteMap.SETTINGS_USER_PWAS} value={RouteMap.SETTINGS_USER_PWAS} icon={<AppsIcon />} label='Pwas' />
          <Tab
            id={RouteMap.SETTINGS_USER_ACCOUNT}
            value={RouteMap.SETTINGS_USER_ACCOUNT}
            icon={<AccountCircleIcon />}
            label='Update'
          />
          <TabControls index={route} />
        </Tabs>
      </Box>
      <Conditional value={route}>
        <UserPwas key={`${RouteMap.SETTINGS},${RouteMap.SETTINGS_USER_PWAS}`} />
        <UserForm key={RouteMap.SETTINGS_USER_ACCOUNT} />
      </Conditional>
    </Box>
  );
};

const mapStateToProps = ({ Window: { isMobile } }) => ({ isMobile });

const mapDispatchToProps = {};

UserAccount.propTypes = { isMobile: PropTypes.bool.isRequired };

UserAccount.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
