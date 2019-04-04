import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NhomNoiDung from './nhom-noi-dung';
import NhomNoiDungDetail from './nhom-noi-dung-detail';
import NhomNoiDungUpdate from './nhom-noi-dung-update';
import NhomNoiDungDeleteDialog from './nhom-noi-dung-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NhomNoiDungUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NhomNoiDungUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NhomNoiDungDetail} />
      <ErrorBoundaryRoute path={match.url} component={NhomNoiDung} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NhomNoiDungDeleteDialog} />
  </>
);

export default Routes;
