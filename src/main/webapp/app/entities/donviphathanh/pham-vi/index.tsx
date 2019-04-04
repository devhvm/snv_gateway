import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PhamVi from './pham-vi';
import PhamViDetail from './pham-vi-detail';
import PhamViUpdate from './pham-vi-update';
import PhamViDeleteDialog from './pham-vi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PhamViUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PhamViUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PhamViDetail} />
      <ErrorBoundaryRoute path={match.url} component={PhamVi} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PhamViDeleteDialog} />
  </>
);

export default Routes;
