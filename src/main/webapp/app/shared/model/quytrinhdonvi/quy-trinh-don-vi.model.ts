import { IDuLieuTienTrinh } from 'app/shared/model/quytrinhdonvi/du-lieu-tien-trinh.model';
import { IUyQuyenTienTrinh } from 'app/shared/model/quytrinhdonvi/uy-quyen-tien-trinh.model';

export interface IQuyTrinhDonVi {
  id?: number;
  quyTrinhCode?: string;
  name?: string;
  duLieuTienTrinhs?: IDuLieuTienTrinh[];
  uyQuyenTienTrinhs?: IUyQuyenTienTrinh[];
  coQuanHanhChinhName?: string;
  coQuanHanhChinhId?: number;
}

export const defaultValue: Readonly<IQuyTrinhDonVi> = {};
