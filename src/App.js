import React, { lazy } from 'react';
import { connect } from 'store';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'views';
import { RouteMap } from 'utils';

const Home = lazy(() => import('./views/Home'));
const PageNotFound = lazy(() => import('./views/PageNotFound'));

const App = () => {
  return (
    <main className='App'>
      <Helmet />
      <header className='App-header'>
        <Switch>
          <Route exact path={[RouteMap.ROOT, RouteMap.HOME]} component={Home} />
          <Route render={() => <PageNotFound />} />
        </Switch>
      </header>
    </main>
  );
};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps)(App);
