import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AcessDeny from './acess-deny';
import AcessDenyDetail from './acess-deny-detail';
import AcessDenyUpdate from './acess-deny-update';
import AcessDenyDeleteDialog from './acess-deny-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AcessDenyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AcessDenyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AcessDenyDetail} />
      <ErrorBoundaryRoute path={match.url} component={AcessDeny} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AcessDenyDeleteDialog} />
  </>
);

export default Routes;
