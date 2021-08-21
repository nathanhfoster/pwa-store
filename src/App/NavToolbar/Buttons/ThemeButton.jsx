import React from 'react';
import WbSunny from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { connect } from 'resurrection';
import Base from './Base';
import { ChangeMode } from '../../../store/reducers/User/actions/api';

const ThemeButton = ({ mode, children, ChangeMode }) => {
  const changeMode = () => {
    ChangeMode({ mode: mode === 'light' ? 'dark' : 'light' });
  };

  return (
    <>
      <Base aria-label='Mode of user' onClick={changeMode}>
        {mode === 'light' ? <WbSunny /> : <Brightness3Icon />}
      </Base>
      {children}
    </>
  );
};

const mapStateToProps = ({
  User: {
    id,
    token,
    setting: { mode }
  }
}) => ({
  mode
});

const mapDispatchToProps = { ChangeMode };

export default connect(mapStateToProps, mapDispatchToProps)(ThemeButton);
