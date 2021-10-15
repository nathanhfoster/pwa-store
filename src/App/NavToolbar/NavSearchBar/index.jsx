import React from 'react';
import { connect, useMountedEffect } from 'resurrection';
import { styled, alpha } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useDebouncedValue from 'hooks/useDebouncedValue';
import { ResetPwasFilter, SetPwasSearch, SearchPwas, FilterPwas } from 'store/reducers/Pwas/actions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withRouter } from 'react-router-dom';
import * as RouteMap from 'utils/RouteMap';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
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

const NavSearchBar = ({
  goBack,
  placeholder,
  searchValue,
  isLoading,
  ResetPwasFilter,
  SetPwasSearch,
  SearchPwas,
  FilterPwas
}) => {
  const debouncedSearch = useDebouncedValue(searchValue);

  const onSearch = ({ target: { value } }) => {
    SetPwasSearch(value);
  };

  const handleBackClick = () => {
    ResetPwasFilter();
    goBack();
  };

  useMountedEffect(() => {
    SearchPwas(debouncedSearch);
    FilterPwas(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <>
      <IconButton onClick={handleBackClick}>
        <ArrowBackIcon />
      </IconButton>
      <Search>
        {!isLoading && (
          <SearchIconWrapper>
            <SearchIcon sx={{ animation: 'grow 200ms' }} />
          </SearchIconWrapper>
        )}
        <StyledInputBase
          fullWidth
          placeholder={placeholder}
          inputProps={{ type: 'search', 'aria-label': 'search' }}
          onChange={onSearch}
          value={searchValue}
        />
        {isLoading && <LinearProgress />}
      </Search>
    </>
  );
};

const mapStateToProps = ({
  Pwas: {
    count: allPwasCount,
    search: { value },
    isLoading
  },
  User: {
    pwas: { count: userPwasCount },
    favoritePwas: { items: userFavoritePwas }
  }
}) => ({ allPwasCount, searchValue: value, isLoading, userPwasCount, userFavoritePwasCount: userFavoritePwas.length });

const mapDispatchToProps = { ResetPwasFilter, SetPwasSearch, SearchPwas, FilterPwas };

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
