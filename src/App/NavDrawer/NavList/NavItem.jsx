import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import connect from 'resurrection';
import { ToggleAppNavBar } from 'store/reducers/App/actions';
import { GetPwaTagDetailUrl } from 'utils/RouteMap';
import AppsIcon from '@material-ui/icons/Apps';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { tagIconMap } from './structure';

const listItemStyles = {
  '&:hover': {
    color: 'primary.main',
    svg: {
      color: 'primary.main',
      animationName: 'scale',
      animationDuration: '200ms',
      animationFillMode: 'forwards'
    }
  }
};

const iconStyles = { animation: 'grow 200ms' };

const NavItem = ({ name, navBarIsOpen, divider, ToggleAppNavBar }) => {
  const history = useHistory();
  const Icon = tagIconMap[name] || AppsIcon;
  const onTagClick = () => {
    history.push(GetPwaTagDetailUrl(name));
    if (navBarIsOpen) {
      ToggleAppNavBar(false);
    }
  };

  return (
    <ListItem button divider={divider} sx={listItemStyles} onClick={onTagClick}>
      <ListItemIcon>
        <Icon sx={iconStyles} />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

const mapStateToProps = ({ App: { navBarIsOpen } }) => ({ navBarIsOpen });

const mapDispatchToProps = { ToggleAppNavBar };

export default connect(mapStateToProps, mapDispatchToProps)(NavItem);
