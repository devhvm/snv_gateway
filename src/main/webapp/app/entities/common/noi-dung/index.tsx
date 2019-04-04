import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NoiDung from './noi-dung';
import NoiDungDetail from './noi-dung-detail';
import NoiDungUpdate from './noi-dung-update';
import NoiDungDeleteDialog from './noi-dung-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NoiDungUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NoiDungUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NoiDungDetail} />
      <ErrorBoundaryRoute path={match.url} component={NoiDung} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NoiDungDeleteDialog} />
  </>
);

export default Routes;
