export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface IDanhMuc {
  id?: number;
  danhMucCode?: string;
  name?: string;
  status?: Status;
  nhomdanhmucNhomDanhMucCode?: string;
  nhomdanhmucId?: number;
}

export const defaultValue: Readonly<IDanhMuc> = {};
