import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TieuChiBaoCao from './tieu-chi-bao-cao';
import TieuChiBaoCaoDetail from './tieu-chi-bao-cao-detail';
import TieuChiBaoCaoUpdate from './tieu-chi-bao-cao-update';
import TieuChiBaoCaoDeleteDialog from './tieu-chi-bao-cao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TieuChiBaoCaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TieuChiBaoCaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TieuChiBaoCaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={TieuChiBaoCao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TieuChiBaoCaoDeleteDialog} />
  </>
);

export default Routes;
