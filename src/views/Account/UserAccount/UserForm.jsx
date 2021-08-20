import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'resurrection';
import { UpdateUser } from 'store/reducers/User/actions/api';

const UserForm = ({
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
    <Box component='form' noValidate={false} autoComplete='off' onSubmit={handleSubmit}>
      <TextField
        id='username'
        label='Username'
        name='username'
        required
        fullWidth
        defaultValue={username}
        margin='normal'
      />
      <TextField
        id='email'
        name='email'
        label='email'
        type='email'
        required
        fullWidth
        defaultValue={email}
        margin='normal'
      />
      <TextField
        id='password'
        name='password'
        label='New Password'
        type='password'
        required
        fullWidth
        defaultValue=''
        margin='normal'
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, bgcolor: 'success.dark' }}>
        Update
      </Button>
    </Box>
  );
};

const mapStateToProps = ({ User }) => ({ ...User });

const mapDispatchToProps = { UpdateUser };

UserForm.propTypes = {};

UserForm.defaultProps = {
  error: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
