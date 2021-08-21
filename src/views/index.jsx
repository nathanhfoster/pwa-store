import React, { lazy } from 'react';
import { connect } from 'resurrection';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RouteMap } from 'utils';
import Helmet from './Helmet';
import Box from '@material-ui/core/Box';

const Home = lazy(() => import('./Home'));
const UserAccount = lazy(() => import('./Account/UserAccount'));
const PwasFilteredByTags = lazy(() => import('./PwasFilteredByTags'));
const PageNotFound = lazy(() => import('./PageNotFound'));
const PwaDetail = lazy(() => import('./PwaDetail'));
const Login = lazy(() => import('./Account/Login'));

const AppRouter = ({ userIsLoggedIn }) => {
  return (
    <Box component='header'>
      <Helmet />
      <Switch>
        <Route exact path={[RouteMap.ROOT, RouteMap.HOME]} component={Home} />
        <Route
          exact
          path={[RouteMap.ACCOUNT]}
          render={() => (userIsLoggedIn ? <UserAccount />) : <Redirect to={RouteMap.HOME} />}
        />
        <Route exact path={[RouteMap.PWA_DETAIL]} render={({ match: { params } }) => <PwaDetail {...params} />} />
        <Route exact path={[RouteMap.PWA_TAG_FILTER]} component={PwasFilteredByTags} />
        <Route
          exact
          path={[RouteMap.LOGIN]}
          render={() => (userIsLoggedIn ? <Redirect to={RouteMap.HOME} /> : <Login />)}
        />
        <Route render={() => <PageNotFound />} />
      </Switch>
    </Box>
  );
};

const mapStateToProps = ({ User: { id, token } }) => ({ userIsLoggedIn: Boolean(id && token) });

export default connect(mapStateToProps)(AppRouter);
