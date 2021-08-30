import React, { useEffect } from 'react';
import { connect, useMounted } from 'resurrection';
import { styled, alpha } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useDebounce from 'hooks/useDebounce';
import { ResetPwasFilter, SetPwasSearch, SearchPwas, FilterPwas } from 'store/reducers/Pwas/actions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';

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

const NavSearchBar = ({ search, isLoading, ResetPwasFilter, SetPwasSearch, SearchPwas, FilterPwas }) => {
  const mounted = useMounted();
  const debouncedSearch = useDebounce(search);
  const history = useHistory();

  const onSearch = ({ target: { value } }) => {
    SetPwasSearch(value);
  };

  const handleBackClick = () => {
    ResetPwasFilter();
    history.goBack();
  };

  useEffect(() => {
    if (mounted) {
      SearchPwas(debouncedSearch);
      FilterPwas(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <>
      <IconButton onClick={handleBackClick}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <Search>
        {!isLoading && (
          <SearchIconWrapper>
            <SearchIcon sx={{ animation: 'grow 200ms' }} />
          </SearchIconWrapper>
        )}
        <StyledInputBase
          fullWidth
          placeholder='Search…'
          inputProps={{ type: 'search', 'aria-label': 'search' }}
          onChange={onSearch}
          value={search}
        />
        {isLoading && <LinearProgress />}
      </Search>
    </>
  );
};

const mapStateToProps = ({ Pwas: { search, isLoading } }) => ({ search, isLoading });
const mapDispatchToProps = { ResetPwasFilter, SetPwasSearch, SearchPwas, FilterPwas };

export default connect(mapStateToProps, mapDispatchToProps)(NavSearchBar);
