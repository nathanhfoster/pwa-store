import React from 'react';
import WbSunny from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { connect } from 'resurrection';
import Base from './Base';
import { ChangeMode } from '../../../store/reducers/User/actions/api';

const ThemeButton = ({ userIsLoggedIn, setting, children, ChangeMode }) => {

  const changeMode = () => {
    ChangeMode({ mode: setting.mode === 'light' ? 'dark' : 'light' });
  }
  
  if (!userIsLoggedIn) return null;
  return (
    <>
      <Base
        aria-label='Mode of user'
        onClick={changeMode}
      >
        {setting.mode === 'light' ? <WbSunny /> : <Brightness3Icon />}
      </Base>
      {children}
    </>
  );
};

const mapStateToProps = ({ User: { id, token, setting } }) => ({
  userIsLoggedIn: Boolean(id && token),
  setting
});

const mapDispatchToProps = { ChangeMode };

export default connect(mapStateToProps, mapDispatchToProps)(ThemeButton);
