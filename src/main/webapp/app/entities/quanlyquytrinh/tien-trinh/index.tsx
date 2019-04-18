import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TienTrinh from './tien-trinh';
import TienTrinhDetail from './tien-trinh-detail';
import TienTrinhUpdate from './tien-trinh-update';
import TienTrinhDeleteDialog from './tien-trinh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TienTrinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TienTrinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TienTrinhDetail} />
      <ErrorBoundaryRoute path={match.url} component={TienTrinh} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TienTrinhDeleteDialog} />
  </>
);

export default Routes;
