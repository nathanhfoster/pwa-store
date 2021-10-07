import React, { lazy } from 'react';
import connect from 'resurrection';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RouteMap } from 'utils';
import Helmet from './Helmet';
import Box from '@material-ui/core/Box';
import { PWA_TAG_ID } from 'utils/RouteMap';

const Home = lazy(() => import('./Home'));
const UserAccount = lazy(() => import('./Account/UserAccount'));
const PwasFilteredByTags = lazy(() => import('./PwasFilteredByTags'));
const PageNotFound = lazy(() => import('./PageNotFound'));
const PwaDetail = lazy(() => import('./PwaDetail'));
const PwaProfile = lazy(() => import('./PwaProfile'));
const Login = lazy(() => import('./Account/Login'));

const AppRouter = ({ userIsLoggedIn }) => {
  return (
    <Box component='header'>
      <Helmet />
      <Switch>
        <Route exact path={[RouteMap.ROOT, RouteMap.HOME]} component={Home} />
        <Route
          exact
          path={[
            RouteMap.SETTINGS,
            RouteMap.SETTINGS_USER_PWAS,
            RouteMap.SETTINGS_USER_FAVORITE_PWAS,
            RouteMap.SETTINGS_USER_ACCOUNT
          ]}
          render={({ history }) =>
            userIsLoggedIn ? <UserAccount history={history} /> : <Redirect to={RouteMap.LOGIN} />
          }
        />
        <Route exact path={[RouteMap.PWA_DETAIL]} render={({ match: { params } }) => <PwaDetail {...params} />} />
        <Route exact path={[RouteMap.PWA_PROFILE]} render={({ match: { params } }) => <PwaProfile {...params} />} />
        <Route
          exact
          path={[RouteMap.PWA_TAG_FILTER]}
          render={({ location: { search } }) => {
            let pwaTag = '';
            if (search.replace(' ', '%').includes('%')) {
              const found = search.split(PWA_TAG_ID);
              pwaTag = found[1].replaceAll('%20', ' ');
            } else {
              const query = new URLSearchParams(search);
              pwaTag = query.get('tagName');
            }
            return <PwasFilteredByTags pwaTag={pwaTag} />;
          }}
        />
        <Route
          exact
          path={[RouteMap.LOGIN, RouteMap.REGISTER]}
          render={() => (userIsLoggedIn ? <Redirect to={RouteMap.HOME} /> : <Login />)}
        />
        <Route render={() => <PageNotFound />} />
      </Switch>
    </Box>
  );
};

const mapStateToProps = ({ User: { id, token } }) => ({ userIsLoggedIn: Boolean(id && token) });

export default connect(mapStateToProps)(AppRouter);
