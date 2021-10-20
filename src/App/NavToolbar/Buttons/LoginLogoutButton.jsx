import React, { useMemo } from 'react';
import Base from './Base';
import LoginIcon from '@material-ui/icons/Login';
import LogoutIcon from '@material-ui/icons/Logout';
import { RouteMap } from 'utils';
import connect from 'resurrection';
import { DeleteUser } from 'store/reducers/User/actions';

const LoginLogoutButton = ({ userIsLoggedIn, onClick, children }) => {
  const Icon = useMemo(() => (userIsLoggedIn ? LogoutIcon : LoginIcon), [userIsLoggedIn]);

  const buttonTitle = userIsLoggedIn ? 'Logout' : 'Login';

  const buttonTo = userIsLoggedIn ? undefined : RouteMap.LOGIN;

  const buttonOnClick = userIsLoggedIn ? onClick : undefined;

  return (
    <>
      <Base title={buttonTitle} to={buttonTo} onClick={buttonOnClick}>
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
