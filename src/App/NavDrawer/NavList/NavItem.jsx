import React from 'react';
import { connect } from 'resurrection';
import { ToggleAppNavBar } from 'store/reducers/App/actions';
import { GetPwaTagDetailUrl } from 'utils/RouteMap';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AppsIcon from '@material-ui/icons/Apps';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router';
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

const NavItem = ({ name, navBarIsOpen, ToggleAppNavBar }) => {
  const router = useRouter();
  const Icon = tagIconMap[name] || AppsIcon;
  const onTagClick = () => {
    router.push(GetPwaTagDetailUrl(name));
    if (navBarIsOpen) {
      ToggleAppNavBar(false);
    }
  };

  return (
    <ListItem button sx={listItemStyles} onClick={onTagClick}>
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
