import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import QuyTrinhDonVi from './quy-trinh-don-vi';
import QuyTrinhDonViDetail from './quy-trinh-don-vi-detail';
import QuyTrinhDonViUpdate from './quy-trinh-don-vi-update';
import QuyTrinhDonViDeleteDialog from './quy-trinh-don-vi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuyTrinhDonViUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuyTrinhDonViUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuyTrinhDonViDetail} />
      <ErrorBoundaryRoute path={match.url} component={QuyTrinhDonVi} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={QuyTrinhDonViDeleteDialog} />
  </>
);

export default Routes;
