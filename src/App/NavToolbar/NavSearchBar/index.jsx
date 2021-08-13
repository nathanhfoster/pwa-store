import React, { useEffect } from 'react';
import connect from 'store/connect';
import { styled, alpha } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useMounted from 'hooks/useMounted';
import useDebounce from 'hooks/useDebounce';
import { SetPwasSearch, SearchPwas } from 'store/reducers/Pwas/actions';
import LinearProgress from '@material-ui/core/LinearProgress';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    minWidth: 250,
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

const NavSearchBar = ({ search, isLoading, SetPwasSearch, SearchPwas }) => {
  const mounted = useMounted();
  const debouncedSearch = useDebounce(search);

  const onSearch = ({ target: { value } }) => {
    SetPwasSearch(value);
  };

  useEffect(() => {
    if (mounted) {
      SearchPwas(debouncedSearch);
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
        inputProps={{ 'aria-label': 'search' }}
        onChange={onSearch}
        value={search}
      />
      {isLoading && <LinearProgress />}
    </Search>
  );
};

const mapStateToProps = ({ Pwas: { search, isLoading } }) => ({ search, isLoading });
const mapDispatchToProps = { SetPwasSearch, SearchPwas };

export default connect(mapStateToProps, mapDispatchToProps)(NavSearchBar);
