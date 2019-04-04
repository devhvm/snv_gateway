import { INhomPhanLoai } from 'app/shared/model/common/nhom-phan-loai.model';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface IDonViTinh {
  id?: number;
  donViTinhCode?: string;
  name?: string;
  status?: Status;
  nhomphanloais?: INhomPhanLoai[];
}

export const defaultValue: Readonly<IDonViTinh> = {};
