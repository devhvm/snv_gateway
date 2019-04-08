export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface IDoiTuong {
  id?: number;
  doiTuongCode?: string;
  name?: string;
  status?: Status;
  nhomphanloaiNhomPhanLoaiCode?: string;
  nhomphanloaiId?: number;
}

export const defaultValue: Readonly<IDoiTuong> = {};
