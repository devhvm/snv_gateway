import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DonViTinh from './don-vi-tinh';
import DonViTinhDetail from './don-vi-tinh-detail';
import DonViTinhUpdate from './don-vi-tinh-update';
import DonViTinhDeleteDialog from './don-vi-tinh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DonViTinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DonViTinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DonViTinhDetail} />
      <ErrorBoundaryRoute path={match.url} component={DonViTinh} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DonViTinhDeleteDialog} />
  </>
);

export default Routes;
