import React from 'react';
import dynamic from 'next/dynamic';
import SettingsWrapper from 'views/Account/UserAccount/SettingsWrapper';
import { RouteMap } from 'utils';

const UserPwas = dynamic(() => import('views/Account/UserAccount/UserPwas'), { ssr: false });

const Settings = () => {
  return (
    <SettingsWrapper pathname={RouteMap.SETTINGS_USER_PWAS}>
      <UserPwas key={RouteMap.SETTINGS_USER_PWAS} />
    </SettingsWrapper>
  )
};

export default Settings;
