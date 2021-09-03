import React from 'react';
import WbSunny from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import connect from 'resurrection';
import Base from './Base';
import { ToggleUserMode } from '../../../store/reducers/User/actions/api';

const ThemeButton = ({ Icon, children, onClick }) => (
  <>
    <Base title='Toggle theme' onClick={onClick}>
      <Icon />
    </Base>
    {children}
  </>
);

const mapStateToProps = ({
  User: {
    setting: { mode }
  }
}) => ({
  Icon: mode === 'light' ? WbSunny : Brightness3Icon
});

const mapDispatchToProps = { onClick: ToggleUserMode };

export default connect(mapStateToProps, mapDispatchToProps)(ThemeButton);
