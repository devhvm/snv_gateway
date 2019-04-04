import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DanhMuc from './danh-muc';
import DanhMucDetail from './danh-muc-detail';
import DanhMucUpdate from './danh-muc-update';
import DanhMucDeleteDialog from './danh-muc-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DanhMucUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DanhMucUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DanhMucDetail} />
      <ErrorBoundaryRoute path={match.url} component={DanhMuc} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DanhMucDeleteDialog} />
  </>
);

export default Routes;
