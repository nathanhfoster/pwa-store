import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Conditional from 'components/Conditional';
import Box from '@material-ui/core/Box';
import AppsIcon from '@material-ui/icons/Apps';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { RouteMap } from 'utils';
import connect from 'resurrection';

const UserPwas = lazy(() => import('./UserPwas'));
const UserFavoritePwas = lazy(() => import('./UserFavoritePwas'));
const UserForm = lazy(() => import('./UserForm'));

const UserAccount = ({ isMobile, history }) => {
  const { pathname } = history.location;

  const handleChange = (e, newValue) => {
    history.push(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={pathname}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='inherit'
          variant={isMobile ? 'fullWidth' : 'scrollable'}
        >
          <Tab id={RouteMap.SETTINGS_USER_PWAS} value={RouteMap.SETTINGS_USER_PWAS} icon={<AppsIcon />} label='Pwas' />
          <Tab
            id={RouteMap.SETTINGS_USER_FAVORITE_PWAS}
            value={RouteMap.SETTINGS_USER_FAVORITE_PWAS}
            icon={<FavoriteIcon />}
            label='Favorites'
          />
          <Tab
            id={RouteMap.SETTINGS_USER_ACCOUNT}
            value={RouteMap.SETTINGS_USER_ACCOUNT}
            icon={<AccountCircleIcon />}
            label='Update'
          />
        </Tabs>
      </Box>
      <Conditional value={pathname} sx={{ p: pathname === RouteMap.SETTINGS_USER_ACCOUNT ? 4 : 0 }}>
        <UserPwas key={`${RouteMap.SETTINGS},${RouteMap.SETTINGS_USER_PWAS}`} />
        <UserFavoritePwas key={RouteMap.SETTINGS_USER_FAVORITE_PWAS} />
        <UserForm key={RouteMap.SETTINGS_USER_ACCOUNT} />
      </Conditional>
    </Box>
  );
};

const mapStateToProps = ({ Window: { isMobile } }) => ({ isMobile });

const mapDispatchToProps = {};

// Allows router history changes to make this component stateful
const options = { pure: false };

UserAccount.propTypes = { isMobile: PropTypes.bool.isRequired };

UserAccount.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps, undefined, options)(UserAccount);
