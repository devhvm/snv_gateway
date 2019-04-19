import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DuLieuTienTrinh from './du-lieu-tien-trinh';
import DuLieuTienTrinhDetail from './du-lieu-tien-trinh-detail';
import DuLieuTienTrinhUpdate from './du-lieu-tien-trinh-update';
import DuLieuTienTrinhDeleteDialog from './du-lieu-tien-trinh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DuLieuTienTrinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DuLieuTienTrinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DuLieuTienTrinhDetail} />
      <ErrorBoundaryRoute path={match.url} component={DuLieuTienTrinh} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DuLieuTienTrinhDeleteDialog} />
  </>
);

export default Routes;
