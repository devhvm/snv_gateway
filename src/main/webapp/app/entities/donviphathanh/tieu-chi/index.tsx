import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TieuChi from './tieu-chi';
import TieuChiDetail from './tieu-chi-detail';
import TieuChiUpdate from './tieu-chi-update';
import TieuChiDeleteDialog from './tieu-chi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TieuChiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TieuChiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TieuChiDetail} />
      <ErrorBoundaryRoute path={match.url} component={TieuChi} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TieuChiDeleteDialog} />
  </>
);

export default Routes;
