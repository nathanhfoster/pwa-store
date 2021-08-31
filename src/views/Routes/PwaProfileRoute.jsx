import React, { lazy } from 'react';
import { connect } from 'resurrection';
import { Route, Redirect } from 'react-router-dom';
import * as RouteMap from 'utils/RouteMap';

const PwaProfile = lazy(() => import('../PwaProfile'));

const PwaProfileRoute = ({ isAuthorOfPwa }) => (
  <Route
    exact
    path={[RouteMap.PWA_PROFILE]}
    render={({ match: { params } }) => {
      const { pwaSlug } = params;
      return <PwaProfile {...params} />;
    }}
  />
);

const mapStateToProps = ({ User: { id }, Pwas: { items, filteredItems } }) => ({
  isAuthorOfPwa: items.concat(filteredItems).find(({ created_by }) => id == created_by)
});

export default connect(mapStateToProps)(PwaProfileRoute);
