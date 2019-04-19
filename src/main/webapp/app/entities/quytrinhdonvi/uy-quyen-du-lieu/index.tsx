import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UyQuyenDuLieu from './uy-quyen-du-lieu';
import UyQuyenDuLieuDetail from './uy-quyen-du-lieu-detail';
import UyQuyenDuLieuUpdate from './uy-quyen-du-lieu-update';
import UyQuyenDuLieuDeleteDialog from './uy-quyen-du-lieu-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UyQuyenDuLieuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UyQuyenDuLieuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UyQuyenDuLieuDetail} />
      <ErrorBoundaryRoute path={match.url} component={UyQuyenDuLieu} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UyQuyenDuLieuDeleteDialog} />
  </>
);

export default Routes;
