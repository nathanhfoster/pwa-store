import React, { lazy, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RouteMap } from 'utils';
import Helmet from './Helmet';

const Home = lazy(() => import('./Home'));
const Pwas = lazy(() => import('./Pwas'));
const PageNotFound = lazy(() => import('./PageNotFound'));
const PwaDetail = lazy(() => import('./PwaDetail'));

const AppRouter = () => (
  <Fragment>
    <Helmet />
    <Switch>
      <Route exact path={[RouteMap.ROOT, RouteMap.HOME]} component={Home} />
      <Route exact path={[RouteMap.PWA_DETAIL]} render={({ match: { params } }) => <PwaDetail {...params} />} />
      <Route exact path={[RouteMap.PWA_TAG_FILTER]} component={Pwas} />

      <Route render={() => <PageNotFound />} />
    </Switch>
  </Fragment>
);

export default AppRouter;
