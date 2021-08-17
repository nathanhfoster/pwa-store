import React, { useEffect } from 'react';
import { connect } from 'resurrection';
import { styled, alpha } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useMounted from 'hooks/useMounted';
import useDebounce from 'hooks/useDebounce';
import { SetPwasSearch, SearchPwas, FilterPwas } from 'store/reducers/Pwas/actions';
import LinearProgress from '@material-ui/core/LinearProgress';

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

const NavSearchBar = ({ search, isLoading, SetPwasSearch, SearchPwas, FilterPwas }) => {
  const mounted = useMounted();
  const debouncedSearch = useDebounce(search);

  const onSearch = ({ target: { value } }) => {
    SetPwasSearch(value);
  };

  useEffect(() => {
    if (mounted) {
      SearchPwas(debouncedSearch);
      FilterPwas(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <Search>
      {!isLoading && (
        <SearchIconWrapper>
          <SearchIcon />
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
  );
};

const mapStateToProps = ({ Pwas: { search, isLoading } }) => ({ search, isLoading });
const mapDispatchToProps = { SetPwasSearch, SearchPwas, FilterPwas };

export default connect(mapStateToProps, mapDispatchToProps)(NavSearchBar);
