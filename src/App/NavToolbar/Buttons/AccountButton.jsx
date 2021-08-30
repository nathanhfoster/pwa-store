import React from 'react';
import Base from './Base';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { RouteMap } from 'utils';

const AccountButton = ({ children }) => {
  return (
    <>
      <Base title='Account' to={RouteMap.SETTINGS_USER_ACCOUNT}>
        <AccountCircle />
      </Base>
      {children}
    </>
  );
};

export default AccountButton;
