import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NhomChiTieu from './common/nhom-chi-tieu';
import ChiTieu from './common/chi-tieu';
import NhomDanhMuc from './common/nhom-danh-muc';
import DanhMuc from './common/danh-muc';
import NhomPhanLoai from './common/nhom-phan-loai';
import DoiTuong from './common/doi-tuong';
import DonViTinh from './common/don-vi-tinh';
import NhomNoiDung from './common/nhom-noi-dung';
import NoiDung from './common/noi-dung';
import MauPhatHanh from './donviphathanh/mau-phat-hanh';
import MauPhatHanhTieuChi from './donviphathanh/mau-phat-hanh-tieu-chi';
import TieuChi from './donviphathanh/tieu-chi';
import KyCongBo from './donviphathanh/ky-cong-bo';
import TieuChiBaoCao from './donviphathanh/tieu-chi-bao-cao';
import PhamVi from './donviphathanh/pham-vi';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/nhom-chi-tieu`} component={NhomChiTieu} />
      <ErrorBoundaryRoute path={`${match.url}/chi-tieu`} component={ChiTieu} />
      <ErrorBoundaryRoute path={`${match.url}/nhom-danh-muc`} component={NhomDanhMuc} />
      <ErrorBoundaryRoute path={`${match.url}/danh-muc`} component={DanhMuc} />
      <ErrorBoundaryRoute path={`${match.url}/nhom-phan-loai`} component={NhomPhanLoai} />
      <ErrorBoundaryRoute path={`${match.url}/doi-tuong`} component={DoiTuong} />
      <ErrorBoundaryRoute path={`${match.url}/don-vi-tinh`} component={DonViTinh} />
      <ErrorBoundaryRoute path={`${match.url}/nhom-noi-dung`} component={NhomNoiDung} />
      <ErrorBoundaryRoute path={`${match.url}/noi-dung`} component={NoiDung} />
      <ErrorBoundaryRoute path={`${match.url}/mau-phat-hanh`} component={MauPhatHanh} />
      <ErrorBoundaryRoute path={`${match.url}/mau-phat-hanh-tieu-chi`} component={MauPhatHanhTieuChi} />
      <ErrorBoundaryRoute path={`${match.url}/tieu-chi`} component={TieuChi} />
      <ErrorBoundaryRoute path={`${match.url}/ky-cong-bo`} component={KyCongBo} />
      <ErrorBoundaryRoute path={`${match.url}/tieu-chi-bao-cao`} component={TieuChiBaoCao} />
      <ErrorBoundaryRoute path={`${match.url}/pham-vi`} component={PhamVi} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
