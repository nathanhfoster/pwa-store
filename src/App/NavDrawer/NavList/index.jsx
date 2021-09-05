import React, { lazy, memo } from 'react';
import PropTypes from 'prop-types';
import connect from 'resurrection';
import { ToggleAppNavBar } from 'store/reducers/App/actions';
import { ResetPwasFilter } from 'store/reducers/Pwas/actions/redux';
import { styled } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { HOME, SETTINGS_USER_FAVORITE_PWAS } from 'utils/RouteMap';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/StoreMallDirectory';
import { FixedSizeList as List, areEqual } from 'react-window';
import { APP_DRAWER_WIDTH, APP_DRAWER_HEIGHT } from '../../../constants';

const NavItem = lazy(() => import('./NavItem'));

const Row = memo(({ index, style, data }) => {
  const tag = data[index];
  if (!tag) return null;
  return (
    <div style={style}>
      <NavItem key={tag.name} {...tag} />
    </div>
  );
}, areEqual);

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

const NavList = ({ height, tags, ResetPwasFilter, ToggleAppNavBar }) => {
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
      <List width={APP_DRAWER_WIDTH} height={height} itemCount={tags.length} itemData={tags} itemSize={48}>
        {Row}
      </List>
      <Divider />
    </>
  );
};
const mapStateToProps = ({ Pwas: { tags }, Window: { innerHeight } }) => ({
  height: innerHeight - APP_DRAWER_HEIGHT,
  tags
});
const mapDispatchToProps = { ResetPwasFilter, ToggleAppNavBar };

export default connect(mapStateToProps, mapDispatchToProps)(NavList);
