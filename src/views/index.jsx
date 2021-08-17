import React, { lazy } from 'react';
import { connect } from 'resurrection';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RouteMap } from 'utils';
import Helmet from './Helmet';

const Home = lazy(() => import('./Home'));
const PwasFilteredByTags = lazy(() => import('./PwasFilteredByTags'));
const PageNotFound = lazy(() => import('./PageNotFound'));
const PwaDetail = lazy(() => import('./PwaDetail'));
const Login = lazy(() => import('./Account/Login'));

const AppRouter = ({ userIsLoggedIn }) => {
  return (
    <>
      <Helmet />
      <Switch>
        <Route exact path={[RouteMap.ROOT, RouteMap.HOME]} component={Home} />
        <Route exact path={[RouteMap.PWA_DETAIL]} render={({ match: { params } }) => <PwaDetail {...params} />} />
        <Route exact path={[RouteMap.PWA_TAG_FILTER]} component={PwasFilteredByTags} />
        {userIsLoggedIn ? <Redirect to={RouteMap.HOME} /> : <Route exact path={[RouteMap.LOGIN]} component={Login} />}
        <Route render={() => <PageNotFound />} />
      </Switch>
    </>
  );
};

const mapStateToProps = ({ User: { id, token } }) => ({ userIsLoggedIn: Boolean(id && token) });

export default connect(mapStateToProps)(AppRouter);
