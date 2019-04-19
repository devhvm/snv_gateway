export interface IUyQuyenDuLieu {
  id?: number;
  fromUserId?: string;
  toUserId?: string;
  role?: string;
  quyTrinhDonViName?: string;
  quyTrinhDonViId?: number;
}

export const defaultValue: Readonly<IUyQuyenDuLieu> = {};
