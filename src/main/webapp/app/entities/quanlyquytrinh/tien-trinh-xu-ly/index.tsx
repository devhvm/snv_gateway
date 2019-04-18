import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TienTrinhXuLy from './tien-trinh-xu-ly';
import TienTrinhXuLyDetail from './tien-trinh-xu-ly-detail';
import TienTrinhXuLyUpdate from './tien-trinh-xu-ly-update';
import TienTrinhXuLyDeleteDialog from './tien-trinh-xu-ly-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TienTrinhXuLyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TienTrinhXuLyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TienTrinhXuLyDetail} />
      <ErrorBoundaryRoute path={match.url} component={TienTrinhXuLy} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TienTrinhXuLyDeleteDialog} />
  </>
);

export default Routes;
