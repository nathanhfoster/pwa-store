import * as React from 'react';

import { styled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Portal from '@material-ui/core/Portal';
import { useDispatch } from 'resurrection';
import { UserLogin } from 'store/reducers/User/actions/api';

const icon = `${process.env.PUBLIC_URL}/assets/android-chrome-512x512.png`;

const AppIcon = styled('img')((props) => ({
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  margin: props.theme.spacing(2, 'auto')
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

const SignInSide = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    dispatch(UserLogin(payload));
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
            <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='password'
                name='password'
                label='Password'
                type='password'
                autoComplete='current-password'
              />
              <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, bgcolor: 'primary.dark' }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Grid item>
                <AppIcon
                  src={`${icon}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${icon}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt='Logo'
                  loading='lazy'
                />
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Portal>
  );
};

export default SignInSide;
