import { Moment } from 'moment';
import { INhomPhanLoai } from 'app/shared/model/common/nhom-phan-loai.model';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface IDonVi {
  id?: number;
  donViCode?: string;
  name?: string;
  userName?: string;
  createTime?: Moment;
  updateTime?: Moment;
  status?: Status;
  program?: string;
  phamviId?: number;
  nhomphanloais?: INhomPhanLoai[];
}

export const defaultValue: Readonly<IDonVi> = {};
