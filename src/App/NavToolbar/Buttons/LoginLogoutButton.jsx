import React, { useMemo } from 'react';
import Base from './Base';
import LoginIcon from '@material-ui/icons/Login';
import LogoutIcon from '@material-ui/icons/Logout';
import { RouteMap } from 'utils';
import connect from 'resurrection';
import { DeleteUser } from 'store/reducers/User/actions';

const LoginLogoutButton = ({ userIsLoggedIn, onClick, children }) => {
  const Icon = useMemo(() => (userIsLoggedIn ? LogoutIcon : LoginIcon), [userIsLoggedIn]);
  return (
    <>
      <Base
        title={userIsLoggedIn ? 'Logout' : 'Login'}
        to={userIsLoggedIn ? undefined : RouteMap.LOGIN}
        onClick={userIsLoggedIn ? onClick : undefined}
      >
        <Icon />
      </Base>
      {children}
    </>
  );
};
const mapStateToProps = ({ User: { id, token } }) => ({
  userIsLoggedIn: Boolean(id && token)
});

const mapDispatchToProps = { onClick: DeleteUser };

export default connect(mapStateToProps, mapDispatchToProps)(LoginLogoutButton);
