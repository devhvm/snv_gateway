import { Moment } from 'moment';
import { IDoiTuong } from 'app/shared/model/common/doi-tuong.model';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface INhomPhanLoai {
  id?: number;
  nhomPhanLoaiCode?: string;
  name?: string;
  userName?: string;
  createTime?: Moment;
  updateTime?: Moment;
  status?: Status;
  program?: string;
  doituongs?: IDoiTuong[];
  donviId?: number;
}

export const defaultValue: Readonly<INhomPhanLoai> = {};
