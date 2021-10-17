import React from 'react';
import { connect } from 'resurrection';
import { styled, alpha } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { ResetPwasFilter, SetPwasSearch, SearchPwas } from 'store/reducers/Pwas/actions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withRouter } from 'react-router-dom';
import * as RouteMap from 'utils/RouteMap';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  }
}));

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    minWidth: 200,
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

const inputProps = { type: 'search', 'aria-label': 'search' };

const KEYS_THAT_SEARECH = ['Enter'];

const searchIconProps = { animation: 'grow 200ms' };

const NavSearchBar = ({ goBack, placeholder, isLoading, ResetPwasFilter, SetPwasSearch, SearchPwas }) => {
  const onSearch = ({ target: { value } }) => {
    SetPwasSearch(value);
    // When the 'x' button is clicked in the search field
    if (!value) {
      SearchPwas(value);
    }
  };

  const handleBackClick = () => {
    ResetPwasFilter();
    goBack();
  };

  const handleOnKeyUp = ({ key }) => {
    if (KEYS_THAT_SEARECH.includes(key)) {
      SearchPwas();
    }
  };

  return (
    <>
      <IconButton onClick={handleBackClick}>
        <ArrowBackIcon />
      </IconButton>
      <SearchContainer>
        {!isLoading && (
          <SearchIconWrapper onClick={SearchPwas}>
            <SearchIcon sx={searchIconProps} />
          </SearchIconWrapper>
        )}
        <StyledInputBase
          fullWidth
          placeholder={placeholder}
          inputProps={inputProps}
          onChange={onSearch}
          // value={searchValue}
          onKeyUp={handleOnKeyUp}
        />
        {isLoading && <LinearProgress />}
      </SearchContainer>
    </>
  );
};

const mapStateToProps = ({
  Pwas: { count: allPwasCount, isLoading },
  User: {
    pwas: { count: userPwasCount },
    favoritePwas: { items: userFavoritePwas }
  }
}) => ({ allPwasCount, isLoading, userPwasCount, userFavoritePwasCount: userFavoritePwas.length });

const mapDispatchToProps = { ResetPwasFilter, SetPwasSearch, SearchPwas };

const mergeProps = (stateToProps, dispatchToProps, ownProps) => {
  const { allPwasCount, userPwasCount, userFavoritePwasCount, ...restOfStateToProps } = stateToProps;
  const {
    history: {
      goBack,
      location: { pathname }
    },
    ...restOfOwnProps
  } = ownProps;
  var searchCount = allPwasCount;

  if (pathname.includes(RouteMap.SETTINGS_USER_FAVORITE_PWAS)) {
    searchCount = userFavoritePwasCount;
  } else if (pathname.includes(RouteMap.SETTINGS_USER_PWAS)) {
    searchCount = userPwasCount;
  }

  const moreThanOnePwa = searchCount > 1;

  const placeholder = `Search${moreThanOnePwa ? ` ${searchCount} ` : ' '}pwas...`;
  return {
    ...restOfStateToProps,
    ...dispatchToProps,
    ...restOfOwnProps,
    placeholder,
    goBack
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(NavSearchBar));
