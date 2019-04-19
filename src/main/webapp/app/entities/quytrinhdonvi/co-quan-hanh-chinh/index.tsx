import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CoQuanHanhChinh from './co-quan-hanh-chinh';
import CoQuanHanhChinhDetail from './co-quan-hanh-chinh-detail';
import CoQuanHanhChinhUpdate from './co-quan-hanh-chinh-update';
import CoQuanHanhChinhDeleteDialog from './co-quan-hanh-chinh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CoQuanHanhChinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CoQuanHanhChinhUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CoQuanHanhChinhDetail} />
      <ErrorBoundaryRoute path={match.url} component={CoQuanHanhChinh} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CoQuanHanhChinhDeleteDialog} />
  </>
);

export default Routes;
