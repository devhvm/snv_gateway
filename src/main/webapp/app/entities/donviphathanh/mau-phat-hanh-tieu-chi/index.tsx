import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MauPhatHanhTieuChi from './mau-phat-hanh-tieu-chi';
import MauPhatHanhTieuChiDetail from './mau-phat-hanh-tieu-chi-detail';
import MauPhatHanhTieuChiUpdate from './mau-phat-hanh-tieu-chi-update';
import MauPhatHanhTieuChiDeleteDialog from './mau-phat-hanh-tieu-chi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MauPhatHanhTieuChiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MauPhatHanhTieuChiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MauPhatHanhTieuChiDetail} />
      <ErrorBoundaryRoute path={match.url} component={MauPhatHanhTieuChi} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MauPhatHanhTieuChiDeleteDialog} />
  </>
);

export default Routes;
