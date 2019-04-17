import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MenuRole from './menu-role';
import MenuRoleDetail from './menu-role-detail';
import MenuRoleUpdate from './menu-role-update';
import MenuRoleDeleteDialog from './menu-role-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MenuRoleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MenuRoleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MenuRoleDetail} />
      <ErrorBoundaryRoute path={match.url} component={MenuRole} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MenuRoleDeleteDialog} />
  </>
);

export default Routes;
