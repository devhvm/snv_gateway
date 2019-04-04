import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MauPhatHanh from './mau-phat-hanh';
import MauPhatHanhDetail from './mau-phat-hanh-detail';
import MauPhatHanhUpdate from './mau-phat-hanh-update';
import MauPhatHanhDeleteDialog from './mau-phat-hanh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MauPhatHanhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MauPhatHanhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MauPhatHanhDetail} />
      <ErrorBoundaryRoute path={match.url} component={MauPhatHanh} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MauPhatHanhDeleteDialog} />
  </>
);

export default Routes;
