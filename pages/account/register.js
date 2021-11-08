import React from 'react';
import { RouteMap } from 'utils';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'resurrection';
import { UserSignUp } from 'store/reducers/User/actions/api';
import Link from 'next/link';
import AuthWrapper from 'views/Account/AuthWrapper';

const Copyright = (props) => {
  const year = new Date().getFullYear();
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {`Copyright © Pwa Store ${year}`}
    </Typography>
  );
};

const Register = () => {
  const dispatch = useDispatch();

  const handleSubmit = (payload) => {
    const action = UserSignUp;
    dispatch(action(payload));
  };
  return (
    <AuthWrapper
      title='Sign Up'
      subTitle='Sign Up'
      handleSubmit={handleSubmit}
      dataMap={RouteMap.REGISTER}
    >
      <Grid container>
        <Grid item xs>
          <Link href={RouteMap.ROOT} variant='button' disabled>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href={RouteMap.LOGIN}>
          Have an account already? Log in
          </Link>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </AuthWrapper>
  )
}

export default Register;
