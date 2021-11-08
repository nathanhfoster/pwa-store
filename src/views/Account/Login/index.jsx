import React from 'react';
import { styled } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { RouteMap } from 'utils';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Portal from '@material-ui/core/Portal';
import { useDispatch } from 'resurrection';
import { UserLogin, UserSignUp } from 'store/reducers/User/actions/api';
import BasicForm from 'components/BasicForm';
import { DEFAULT_PWA_IMAGE_SIZE } from '../../../constants';

const icon = `${process.env.NEXT_NEXT_PUBLIC_URL}/assets/android-chrome-512x512.png`;

const AppIcon = styled('img')((props) => ({
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  margin: props.theme.spacing(2, 'auto'),
  borderRadius: props.theme.spacing(1)
}));

const portalStyles = { position: 'absolute', zIndex: 1201, left: 0, right: 0 };

const Copyright = (props) => {
  const year = new Date().getFullYear();
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {`Copyright © Pwa Store ${year}`}
    </Typography>
  );
};

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

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { pathname } = history.location;

  const isLoginForm = pathname === RouteMap.LOGIN;

  const formTitle = isLoginForm ? 'Sign in' : 'Register';

  const handleSetInputFields = (pathname) => () => history.push(pathname);

  const handleSubmit = (payload) => {
    const action = isLoginForm ? UserLogin : UserSignUp;
    dispatch(action(payload));
  };

  return (
    <Portal container={() => document.getElementById('portal-root')}>
      <Grid container sx={portalStyles}>
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
            <BasicForm
              title={formTitle}
              submitTitle={formTitle}
              submitJson={false}
              data={INPUT_FIELD_MAP[pathname]}
              onSubmit={handleSubmit}
            >
              <Grid container>
                <Grid item xs>
                  <Link variant='button' disabled>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    variant='button'
                    onClick={handleSetInputFields(isLoginForm ? RouteMap.REGISTER : RouteMap.LOGIN)}
                  >
                    {isLoginForm ? "Don't have an account? Sign up" : 'Have an account already? Log in'}
                  </Link>
                </Grid>
              </Grid>
              <Grid item>
                <AppIcon src={icon} srcSet={icon} alt='Logo' loading='lazy' />
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </BasicForm>
          </Box>
        </Grid>
      </Grid>
    </Portal>
  );
};

export default Login;
