import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import LoadingScreen from 'components/LoadingScreen';
import BasicForm from 'components/BasicForm';
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
  const handleSubmit = (payload) => {
    UpdateUser(payload);
  };

  const userFormFields = useMemo(
    () => [
      {
        required: true,
        id: 'username',
        defaultValue: username
      },
      {
        required: true,
        id: 'name',
        defaultValue: name
      },
      {
        required: true,
        type: 'email',
        defaultValue: email
      },
      {
        required: true,
        type: 'password'
      }
    ],
    [username, name, email]
  );

  return (
    <Box p={4}>
      {isLoading ? (
        <BasicForm title='Update Account' submitTitle='Update' />
      ) : (
        <BasicForm title='Update Account' submitTitle='Update' data={userFormFields} onSubmit={handleSubmit} />
      )}
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
