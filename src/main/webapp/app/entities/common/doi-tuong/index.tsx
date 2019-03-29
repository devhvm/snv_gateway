import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DoiTuong from './doi-tuong';
import DoiTuongDetail from './doi-tuong-detail';
import DoiTuongUpdate from './doi-tuong-update';
import DoiTuongDeleteDialog from './doi-tuong-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DoiTuongUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DoiTuongUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DoiTuongDetail} />
      <ErrorBoundaryRoute path={match.url} component={DoiTuong} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DoiTuongDeleteDialog} />
  </>
);

export default Routes;
