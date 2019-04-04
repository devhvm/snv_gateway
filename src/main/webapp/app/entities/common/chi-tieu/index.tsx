import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChiTieu from './chi-tieu';
import ChiTieuDetail from './chi-tieu-detail';
import ChiTieuUpdate from './chi-tieu-update';
import ChiTieuDeleteDialog from './chi-tieu-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChiTieuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChiTieuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChiTieuDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChiTieu} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChiTieuDeleteDialog} />
  </>
);

export default Routes;
