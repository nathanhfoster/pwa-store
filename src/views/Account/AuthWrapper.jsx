import React from 'react';
import { RouteMap } from 'utils';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import BasicForm from 'components/BasicForm';

const containerStyles = { position: 'absolute', zIndex: 1201, top: 0, bottom: 0, left: 0, right: 0 };

const LOGIN_INPUT_FIELDS = {
  username: {
    required: true,
    autoComplete: 'username',
    autoFocus: true
  },
  password: {
    required: true,
    type: 'password',
    autoComplete: 'password'
  },
  remember: {
    type: 'checkbox'
  }
};

const SIGN_UP_INPUT_FIELDS = {
  username: {
    required: true,
    autoComplete: 'username',
    autoFocus: true
  },
  name: {
    autoComplete: 'name'
  },
  email: {
    required: true,
    type: 'email',
    autoComplete: 'email'
  },
  password: {
    required: true,
    type: 'password',
    autoComplete: 'password'
  }
};

const INPUT_FIELD_MAP = {
  [RouteMap.LOGIN]: LOGIN_INPUT_FIELDS,
  [RouteMap.REGISTER]: SIGN_UP_INPUT_FIELDS
};

const AuthWrapper = ({ handleSubmit, title, subTitle, dataMap, children }) => {
  return (
    <Grid container sx={containerStyles}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'linear-gradient(to right bottom, #38b6ff, #37b0f8, #37aaf1, #36a5eb, #359fe4, #2b96de, #218ed8, #1785d2, #0077ca, #0068c1, #0059b8, #004aad);',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            m: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar
            variant='rounded'
            sx={{
              m: 1,
              bgcolor: 'primary.dark',
              color: 'white'
            }}
          >
            <LockOutlinedIcon fontSize='large' />
          </Avatar>
          {<BasicForm
            title={title}
            submitTitle={subTitle}
            submitJson={false}
            data={INPUT_FIELD_MAP[dataMap]}
            onSubmit={handleSubmit}
          >
            {children}
          </BasicForm>}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthWrapper;

