import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NhomDanhMuc from './nhom-danh-muc';
import NhomDanhMucDetail from './nhom-danh-muc-detail';
import NhomDanhMucUpdate from './nhom-danh-muc-update';
import NhomDanhMucDeleteDialog from './nhom-danh-muc-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NhomDanhMucUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NhomDanhMucUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NhomDanhMucDetail} />
      <ErrorBoundaryRoute path={match.url} component={NhomDanhMuc} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NhomDanhMucDeleteDialog} />
  </>
);

export default Routes;
