import React from 'react';
import PropTypes from 'prop-types';
import connect from 'store/connect';
import { ResetPwasFilter } from 'store/reducers/Pwas/actions/redux';
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
import { tagIconMap } from './structure';

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

const NavList = ({ tags, ResetPwasFilter }) => {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push(HOME);
    ResetPwasFilter();
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
        {tags.map(({ name }) => {
          const Icon = tagIconMap[name] || AppsIcon;
          const onTagClick = () => history.push(GetPwaTagDetailUrl(name));
          return (
            <ListItem button key={name} onClick={onTagClick}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </div>
  );
};
const mapStateToProps = ({ Pwas: { tags } }) => ({ tags });
const mapDispatchToProps = { ResetPwasFilter };

export default connect(mapStateToProps, mapDispatchToProps)(NavList);
