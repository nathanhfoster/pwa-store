import React, { useMemo } from 'react';
import Base from './Base';
import LoginIcon from '@material-ui/icons/Login';
import LogoutIcon from '@material-ui/icons/Logout';
import { RouteMap } from 'utils';
import { connect } from 'resurrection';
import { DeleteUser } from 'store/reducers/User/actions';

const LoginButton = ({ addToHomeScreenPrompt, userIsLoggedIn, DeleteUser, children }) => {
  const Icon = useMemo(() => (userIsLoggedIn ? LogoutIcon : LoginIcon), [userIsLoggedIn]);
  return (
    <>
      <Base
        title={userIsLoggedIn ? 'Logout' : 'Login'}
        href={userIsLoggedIn ? undefined : RouteMap.LOGIN}
        onClick={userIsLoggedIn ? DeleteUser : undefined}
        edge={addToHomeScreenPrompt ? false : 'end'}
        aria-label='account of current user'
        aria-haspopup='true'
      >
        <Icon />
      </Base>
      {children}
    </>
  );
};
const mapStateToProps = ({ App: { addToHomeScreenPrompt }, User: { id, token } }) => ({
  addToHomeScreenPrompt,
  userIsLoggedIn: Boolean(id && token)
});

const mapDispatchToProps = { DeleteUser };

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
