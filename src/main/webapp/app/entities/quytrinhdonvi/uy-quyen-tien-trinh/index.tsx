import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UyQuyenTienTrinh from './uy-quyen-tien-trinh';
import UyQuyenTienTrinhDetail from './uy-quyen-tien-trinh-detail';
import UyQuyenTienTrinhUpdate from './uy-quyen-tien-trinh-update';
import UyQuyenTienTrinhDeleteDialog from './uy-quyen-tien-trinh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UyQuyenTienTrinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UyQuyenTienTrinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UyQuyenTienTrinhDetail} />
      <ErrorBoundaryRoute path={match.url} component={UyQuyenTienTrinh} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UyQuyenTienTrinhDeleteDialog} />
  </>
);

export default Routes;
