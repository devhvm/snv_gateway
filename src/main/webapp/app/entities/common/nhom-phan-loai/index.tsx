import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NhomPhanLoai from './nhom-phan-loai';
import NhomPhanLoaiDetail from './nhom-phan-loai-detail';
import NhomPhanLoaiUpdate from './nhom-phan-loai-update';
import NhomPhanLoaiDeleteDialog from './nhom-phan-loai-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NhomPhanLoaiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NhomPhanLoaiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NhomPhanLoaiDetail} />
      <ErrorBoundaryRoute path={match.url} component={NhomPhanLoai} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NhomPhanLoaiDeleteDialog} />
  </>
);

export default Routes;
