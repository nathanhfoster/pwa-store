import React, { useMemo, lazy } from 'react';
import PropTypes from 'prop-types';
import connect from 'resurrection';
import { ToggleAppNavBar } from 'store/reducers/App/actions';
import { ResetPwasFilter } from 'store/reducers/Pwas/actions/redux';
import { styled } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { HOME, SETTINGS_USER_FAVORITE_PWAS } from 'utils/RouteMap';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/StoreMallDirectory';

const NavItem = lazy(() => import('./NavItem'));

const StyledToolbar = styled(Toolbar)((props) => ({
  display: 'flex',
  justifyContent: 'center',
  color: props.theme.palette.primary.main
}));

const HOME_ICON_SIZE = 32;

const iconStyles = {
  width: HOME_ICON_SIZE,
  height: HOME_ICON_SIZE,
  animation: 'grow 200ms',
  '&:hover': { color: 'primary.main' }
};

const NavList = ({ tags, ResetPwasFilter, ToggleAppNavBar }) => {
  const history = useHistory();

  const handleResetNavBar = () => {
    ResetPwasFilter();
    ToggleAppNavBar(false);
  };

  const handleHomeClick = () => {
    history.push(HOME);
    handleResetNavBar();
  };

  const handleFavoriteClick = () => {
    history.push(SETTINGS_USER_FAVORITE_PWAS);
    handleResetNavBar();
  };

  const renderTags = useMemo(() => tags.map((tag) => <NavItem key={tag.name} {...tag} />), [tags]);

  return (
    <>
      <StyledToolbar>
        <IconButton edge='start' onClick={handleHomeClick}>
          <HomeIcon sx={iconStyles} />
        </IconButton>
        <IconButton edge='start' onClick={handleFavoriteClick}>
          <FavoriteIcon sx={iconStyles} />
        </IconButton>
      </StyledToolbar>
      <Divider />
      <List>{renderTags}</List>
      <Divider />
    </>
  );
};
const mapStateToProps = ({ Pwas: { tags } }) => ({ tags });
const mapDispatchToProps = { ResetPwasFilter, ToggleAppNavBar };

export default connect(mapStateToProps, mapDispatchToProps)(NavList);
