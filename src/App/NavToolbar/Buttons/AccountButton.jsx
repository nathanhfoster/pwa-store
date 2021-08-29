import React from 'react';
import Base from './Base';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'resurrection';
import { RouteMap } from 'utils';

const AccountButton = ({ userIsLoggedIn, children }) => {
  if (!userIsLoggedIn) {
    return null;
  }
  return (
    <>
      <Base title='Account' to={userIsLoggedIn ? RouteMap.SETTINGS_USER_ACCOUNT : undefined}>
        <AccountCircle />
      </Base>
      {children}
    </>
  );
};

const mapStateToProps = ({ User: { id, token } }) => ({
  userIsLoggedIn: Boolean(id && token)
});

export default connect(mapStateToProps)(AccountButton);
