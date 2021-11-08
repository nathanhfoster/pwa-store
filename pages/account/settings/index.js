import React from 'react';
import dynamic from 'next/dynamic';
import SettingsWrapper from 'views/Account/UserAccount/SettingsWrapper';
import { RouteMap } from 'utils';

const UserForm = dynamic(() => import('views/Account/UserAccount/UserForm'), { ssr: false });

const Settings = () => {
  return (
    <SettingsWrapper pathname={RouteMap.SETTINGS_USER_ACCOUNT}>
      <UserForm key={RouteMap.SETTINGS_USER_ACCOUNT} />
    </SettingsWrapper>
  )
};

export default Settings;
