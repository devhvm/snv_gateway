import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import KyCongBo from './ky-cong-bo';
import KyCongBoDetail from './ky-cong-bo-detail';
import KyCongBoUpdate from './ky-cong-bo-update';
import KyCongBoDeleteDialog from './ky-cong-bo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={KyCongBoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={KyCongBoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={KyCongBoDetail} />
      <ErrorBoundaryRoute path={match.url} component={KyCongBo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={KyCongBoDeleteDialog} />
  </>
);

export default Routes;
