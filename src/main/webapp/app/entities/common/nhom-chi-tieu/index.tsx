import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NhomChiTieu from './nhom-chi-tieu';
import NhomChiTieuDetail from './nhom-chi-tieu-detail';
import NhomChiTieuUpdate from './nhom-chi-tieu-update';
import NhomChiTieuDeleteDialog from './nhom-chi-tieu-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NhomChiTieuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NhomChiTieuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NhomChiTieuDetail} />
      <ErrorBoundaryRoute path={match.url} component={NhomChiTieu} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NhomChiTieuDeleteDialog} />
  </>
);

export default Routes;
