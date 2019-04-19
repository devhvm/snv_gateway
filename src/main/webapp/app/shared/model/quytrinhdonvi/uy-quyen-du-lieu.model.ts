export interface IUyQuyenDuLieu {
  id?: number;
  fromUserId?: string;
  toUserId?: string;
  role?: string;
  duLieuTienTrinhId?: number;
}

export const defaultValue: Readonly<IUyQuyenDuLieu> = {};
