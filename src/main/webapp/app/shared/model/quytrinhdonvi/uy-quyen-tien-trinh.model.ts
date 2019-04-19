export interface IUyQuyenTienTrinh {
  id?: number;
  tienTrinhCode?: string;
  fromUserId?: string;
  toUserId?: string;
  role?: string;
  quyTrinhDonViName?: string;
  quyTrinhDonViId?: number;
}

export const defaultValue: Readonly<IUyQuyenTienTrinh> = {};
