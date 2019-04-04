import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import nhomChiTieu, {
  NhomChiTieuState
} from 'app/entities/common/nhom-chi-tieu/nhom-chi-tieu.reducer';
// prettier-ignore
import chiTieu, {
  ChiTieuState
} from 'app/entities/common/chi-tieu/chi-tieu.reducer';
// prettier-ignore
import nhomDanhMuc, {
  NhomDanhMucState
} from 'app/entities/common/nhom-danh-muc/nhom-danh-muc.reducer';
// prettier-ignore
import danhMuc, {
  DanhMucState
} from 'app/entities/common/danh-muc/danh-muc.reducer';
// prettier-ignore
import nhomPhanLoai, {
  NhomPhanLoaiState
} from 'app/entities/common/nhom-phan-loai/nhom-phan-loai.reducer';
// prettier-ignore
import doiTuong, {
  DoiTuongState
} from 'app/entities/common/doi-tuong/doi-tuong.reducer';
// prettier-ignore
import donVi, {
  DonViState
} from 'app/entities/common/don-vi/don-vi.reducer';
// prettier-ignore
import phamVi, {
  PhamViState
} from 'app/entities/donviphathanh/pham-vi/pham-vi.reducer';
// prettier-ignore
import nhomNoiDung, {
  NhomNoiDungState
} from 'app/entities/common/nhom-noi-dung/nhom-noi-dung.reducer';
// prettier-ignore
import noiDung, {
  NoiDungState
} from 'app/entities/common/noi-dung/noi-dung.reducer';
// prettier-ignore
import mauPhatHanh, {
  MauPhatHanhState
} from 'app/entities/donviphathanh/mau-phat-hanh/mau-phat-hanh.reducer';
// prettier-ignore
import mauPhatHanhTieuChi, {
  MauPhatHanhTieuChiState
} from 'app/entities/donviphathanh/mau-phat-hanh-tieu-chi/mau-phat-hanh-tieu-chi.reducer';
// prettier-ignore
import tieuChi, {
  TieuChiState
} from 'app/entities/donviphathanh/tieu-chi/tieu-chi.reducer';
// prettier-ignore
import kyCongBo, {
  KyCongBoState
} from 'app/entities/donviphathanh/ky-cong-bo/ky-cong-bo.reducer';
// prettier-ignore
import tieuChiBaoCao, {
  TieuChiBaoCaoState
} from 'app/entities/donviphathanh/tieu-chi-bao-cao/tieu-chi-bao-cao.reducer';
// prettier-ignore
import donViTinh, {
  DonViTinhState
} from 'app/entities/common/don-vi-tinh/don-vi-tinh.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly nhomChiTieu: NhomChiTieuState;
  readonly chiTieu: ChiTieuState;
  readonly nhomDanhMuc: NhomDanhMucState;
  readonly danhMuc: DanhMucState;
  readonly nhomPhanLoai: NhomPhanLoaiState;
  readonly doiTuong: DoiTuongState;
  readonly donVi: DonViState;
  readonly phamVi: PhamViState;
  readonly nhomNoiDung: NhomNoiDungState;
  readonly noiDung: NoiDungState;
  readonly mauPhatHanh: MauPhatHanhState;
  readonly mauPhatHanhTieuChi: MauPhatHanhTieuChiState;
  readonly tieuChi: TieuChiState;
  readonly kyCongBo: KyCongBoState;
  readonly tieuChiBaoCao: TieuChiBaoCaoState;
  readonly donViTinh: DonViTinhState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  nhomChiTieu,
  chiTieu,
  nhomDanhMuc,
  danhMuc,
  nhomPhanLoai,
  doiTuong,
  donVi,
  phamVi,
  nhomNoiDung,
  noiDung,
  mauPhatHanh,
  mauPhatHanhTieuChi,
  tieuChi,
  kyCongBo,
  tieuChiBaoCao,
  donViTinh,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
