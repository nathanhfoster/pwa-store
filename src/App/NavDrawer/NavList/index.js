import React from 'react';
import { styled } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { HOME } from 'utils/RouteMap';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import AppsIcon from '@material-ui/icons/Apps';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import BuildIcon from '@material-ui/icons/Build';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BusinessIcon from '@material-ui/icons/Business';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import SchoolIcon from '@material-ui/icons/School';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import StarIcon from '@material-ui/icons/Star';
import BookIcon from '@material-ui/icons/Book';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';

const categories = [
  'Games',
  'Tools',
  'Social',
  'News',
  'Shopping',
  'Food & Drink',
  'Lifestyle',
  'Business',
  'Music',
  'Sports',
  'Education',
  'Travel',
  'Entertainment',
  'Reference',
  'Productivity',
  'Offline'
];

const categoryIconMap = {
  Games: VideogameAssetIcon,
  Tools: BuildIcon,
  Social: SentimentVerySatisfiedIcon,
  News: ListAltIcon,
  Shopping: ShoppingCartIcon,
  'Food & Drink': FastfoodIcon,
  Lifestyle: FavoriteIcon,
  Business: BusinessIcon,
  Music: MusicNoteIcon,
  Sports: SportsFootballIcon,
  Education: SchoolIcon,
  Travel: FlightTakeoffIcon,
  Entertainment: StarIcon,
  Reference: BookIcon,
  Productivity: KeyboardIcon,
  Offline: SignalWifiOffIcon
};

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
            <ListItem button key={category}>
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
