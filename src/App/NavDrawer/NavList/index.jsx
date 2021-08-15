import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import { ToggleAppNavBar } from 'store/reducers/App/actions';
import { ResetPwasFilter } from 'store/reducers/Pwas/actions/redux';
import { styled } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { HOME } from 'utils/RouteMap';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const NavItem = lazy(() => import('./NavItem'));

const StyledToolbar = styled(Toolbar)((props) => ({
  display: 'flex',
  justifyContent: 'center',
  color: props.theme.palette.primary.main
}));

const HOME_ICON_SIZE = 32;

const StyledHomeIcon = styled(HomeIcon)((props) => ({
  width: HOME_ICON_SIZE,
  height: HOME_ICON_SIZE,
  '&:hover': { color: props.theme.palette.primary.main }
}));

const NavList = ({ tags, ResetPwasFilter, ToggleAppNavBar }) => {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push(HOME);
    ResetPwasFilter();
    ToggleAppNavBar(false);
  };

  return (
    <div>
      <StyledToolbar test='test'>
        <IconButton edge='start' onClick={handleHomeClick}>
          <StyledHomeIcon />
        </IconButton>
      </StyledToolbar>
      <Divider />
      <List>
        {tags.map((tag) => (
          <NavItem key={tag.name} {...tag} />
        ))}
      </List>
      <Divider />
    </div>
  );
};
const mapStateToProps = ({ Pwas: { tags } }) => ({ tags });
const mapDispatchToProps = { ResetPwasFilter, ToggleAppNavBar };

export default connect(mapStateToProps, mapDispatchToProps)(NavList);
