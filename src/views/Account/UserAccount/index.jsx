import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { connect } from 'resurrection';
import { UpdateUser } from 'store/reducers/User/actions/api';

const StyledForm = styled('form')((props) => ({
  // color: props.theme.palette.primary.main
}));

const UserAccount = ({
  isLoading,
  error,
  token,
  id,
  username,
  name,
  email,
  setting: { mode },
  is_active,
  is_superuser,
  is_staff,
  last_login,
  date_joined,
  error: { message },
  UpdateUser
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    UpdateUser(payload);
  };
  return (
    <Grid container spacing={3} p={4}>
      <Grid item xs={12}>
        <Typography variant='h6'>Account</Typography>
      </Grid>
      <Grid item>
        <Box as={StyledForm} noValidate={false} autoComplete='off' onSubmit={handleSubmit}>
          <TextField id='username' label='Username' name='username' fullWidth defaultValue={username} />
          <TextField id='email' name='email' label='email' type='email' fullWidth defaultValue={email} />
          <TextField id='password' name='password' label='New Password' type='password' fullWidth defaultValue='' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, bgcolor: 'primary.dark' }}>
            Update
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ User }) => ({ ...User });

const mapDispatchToProps = { UpdateUser };

UserAccount.propTypes = {};

UserAccount.defaultProps = {
  error: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
