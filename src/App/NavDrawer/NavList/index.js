import React from 'react';
import { styled } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { HOME, GetPwaTagDetailUrl } from 'utils/RouteMap';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AppsIcon from '@material-ui/icons/Apps';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { categories, categoryIconMap } from './structure';

const StyledToolbar = styled(Toolbar)((props) => ({
  display: 'flex',
  justifyContent: 'center',
  color: props.theme.palette.primary.main
}));

const StyledHomeIcon = styled(HomeIcon)((props) => ({
  width: 32,
  height: 32,
  '&:hover': { color: props.theme.palette.primary.main }
}));

const NavList = () => {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push(HOME);
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
        {categories.map((category) => {
          const Icon = categoryIconMap[category] || AppsIcon;
          return (
            <ListItem button key={category} onClick={() => history.push(GetPwaTagDetailUrl(category))}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </div>
  );
};

export default NavList;
