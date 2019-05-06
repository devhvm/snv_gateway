import { IUyQuyenDuLieu } from 'app/shared/model/quytrinhdonvi/uy-quyen-du-lieu.model';

export interface IDuLieuTienTrinh {
  id?: number;
  tienTrinhCode?: string;
  duLieuCode?: string;
  fromUserId?: string;
  toUserId?: string;
  level?: string;
  note?: string;
  uyQuyenDuLieus?: IUyQuyenDuLieu[];
  quyTrinhDonViName?: string;
  quyTrinhDonViId?: number;
}

export const defaultValue: Readonly<IDuLieuTienTrinh> = {};
