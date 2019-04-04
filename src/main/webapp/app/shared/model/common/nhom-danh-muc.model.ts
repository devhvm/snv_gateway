import { IDanhMuc } from 'app/shared/model/common/danh-muc.model';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface INhomDanhMuc {
  id?: number;
  nhomDanhMucCode?: string;
  name?: string;
  status?: Status;
  danhmucs?: IDanhMuc[];
}

export const defaultValue: Readonly<INhomDanhMuc> = {};
