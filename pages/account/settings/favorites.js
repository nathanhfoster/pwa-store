import React from 'react';
import dynamic from 'next/dynamic';
import SettingsWrapper from 'views/Account/UserAccount/SettingsWrapper';
import { RouteMap } from 'utils';

const UserFavoritePwas = dynamic(() => import('views/Account/UserAccount/UserFavoritePwas'), { ssr: false });

const Settings = () => {
  return (
    <SettingsWrapper pathname={RouteMap.SETTINGS_USER_FAVORITE_PWAS}>
      <UserFavoritePwas key={RouteMap.SETTINGS_USER_FAVORITE_PWAS} />
    </SettingsWrapper>
  )
};

export default Settings;
