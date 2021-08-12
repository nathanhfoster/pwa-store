import { useState } from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { CircularProgress } from '@material-ui/core';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
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

const NavSearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [searchkey, setSearchkey] = useState('');
  const onChange = (e) => {
    setLoading(true);
    setSearchkey(e.target.value);
  }
  return (
    <Search>
      <SearchIconWrapper>
        {loading ? <CircularProgress color="inherit" thickness={5} size={20} /> : <SearchIcon />}
      </SearchIconWrapper>
      <StyledInputBase
        value={searchkey}
        onChange={onChange}
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default NavSearchBar;
