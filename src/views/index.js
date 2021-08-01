import React, { lazy, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RouteMap } from 'utils';
import Helmet from './Helmet';

const Home = lazy(() => import('./Home'));
const PageNotFound = lazy(() => import('./PageNotFound'));

const AppRouter = () => (
  <Fragment>
    <Helmet />
    <Switch>
      <Route exact path={[RouteMap.ROOT, RouteMap.HOME]} component={Home} />
      <Route render={() => <PageNotFound />} />
    </Switch>
  </Fragment>
);

export default AppRouter;
