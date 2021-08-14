import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { GetPwaTagDetailUrl } from 'utils/RouteMap';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AppsIcon from '@material-ui/icons/Apps';
import ListItemText from '@material-ui/core/ListItemText';
import { tagIconMap } from './structure';
import { useHistory } from 'react-router-dom';

const NavItem = ({ name }) => {
  const history = useHistory();
  const Icon = tagIconMap[name] || AppsIcon;
  const onTagClick = () => {
    history.push(GetPwaTagDetailUrl(name));
  };

  return (
    <ListItem button onClick={onTagClick}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export default memo(NavItem);
