import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import QuyTrinh from './quy-trinh';
import QuyTrinhDetail from './quy-trinh-detail';
import QuyTrinhUpdate from './quy-trinh-update';
import QuyTrinhDeleteDialog from './quy-trinh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuyTrinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuyTrinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuyTrinhDetail} />
      <ErrorBoundaryRoute path={match.url} component={QuyTrinh} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={QuyTrinhDeleteDialog} />
  </>
);

export default Routes;
