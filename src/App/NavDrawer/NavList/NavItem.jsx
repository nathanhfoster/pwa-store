import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'resurrection';
import { ToggleAppNavBar } from 'store/reducers/App/actions';
import { GetPwaTagDetailUrl } from 'utils/RouteMap';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AppsIcon from '@material-ui/icons/Apps';
import ListItemText from '@material-ui/core/ListItemText';
import { tagIconMap } from './structure';
import { styled } from '@material-ui/core/styles';

const StyledListItem = styled(ListItem)((props) => ({
  '&:hover': { color: props.theme.palette.primary.main }
}));

const NavItem = ({ name, navBarIsOpen, ToggleAppNavBar }) => {
  const history = useHistory();
  const Icon = tagIconMap[name] || AppsIcon;
  const onTagClick = () => {
    history.push(GetPwaTagDetailUrl(name));
    if (navBarIsOpen) {
      ToggleAppNavBar(false);
    }
  };

  return (
    <StyledListItem button onClick={onTagClick}>
      <ListItemIcon>
        <Icon sx={{ animation: 'grow 200ms' }} />
      </ListItemIcon>
      <ListItemText primary={name} />
    </StyledListItem>
  );
};

const mapStateToProps = ({ App: { navBarIsOpen } }) => ({ navBarIsOpen });

const mapDispatchToProps = { ToggleAppNavBar };

export default connect(mapStateToProps, mapDispatchToProps)(NavItem);
