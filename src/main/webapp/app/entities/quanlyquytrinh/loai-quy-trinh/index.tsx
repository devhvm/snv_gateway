import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LoaiQuyTrinh from './loai-quy-trinh';
import LoaiQuyTrinhDetail from './loai-quy-trinh-detail';
import LoaiQuyTrinhUpdate from './loai-quy-trinh-update';
import LoaiQuyTrinhDeleteDialog from './loai-quy-trinh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LoaiQuyTrinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LoaiQuyTrinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LoaiQuyTrinhDetail} />
      <ErrorBoundaryRoute path={match.url} component={LoaiQuyTrinh} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LoaiQuyTrinhDeleteDialog} />
  </>
);

export default Routes;
