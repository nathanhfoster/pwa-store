import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useRouter } from 'next/router';
import Conditional from 'components/Conditional';
import Box from '@material-ui/core/Box';
import AppsIcon from '@material-ui/icons/Apps';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { RouteMap } from 'utils';
import { connect } from 'resurrection';

const UserAccount = ({ isMobile, pathname, children }) => {
  const router = useRouter();

  const handleChange = (e, newVal) => {
    e.preventDefault();
    router.push(newVal);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          onChange = {handleChange}
          value={pathname}
          indicatorColor='primary'
          textColor='inherit'
          variant={isMobile ? 'fullWidth' : 'scrollable'}
        >
          <Tab
            id={RouteMap.SETTINGS_USER_ACCOUNT}
            value={RouteMap.SETTINGS_USER_ACCOUNT}
            icon={<AccountCircleIcon />}
            label='Update'
          />
          <Tab
            id={RouteMap.SETTINGS_USER_PWAS}
            value={RouteMap.SETTINGS_USER_PWAS}
            icon={<AppsIcon />}
            label='Pwas'
          />
          <Tab
            id={RouteMap.SETTINGS_USER_FAVORITE_PWAS}
            value={RouteMap.SETTINGS_USER_FAVORITE_PWAS}
            icon={<FavoriteIcon />}
            label='Favorites'
          />
        </Tabs>
      </Box>
      <Conditional value={pathname} sx={{ p: pathname === RouteMap.SETTINGS_USER_ACCOUNT ? 4 : 0 }}>
        {children}
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
